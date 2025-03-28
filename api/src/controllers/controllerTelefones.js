const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        
        const alunoExists = await prisma.aluno.findUnique({
            where: { ra: req.body.alunoRa }
        });

        if (!alunoExists) {
            return res.status(404).json({ error: 'Aluno não encontrado' });
        }

        const telefone = await prisma.telefone.create({
            data: {
                numero: req.body.numero,
                tipo: req.body.tipo,
                alunoRa: req.body.alunoRa
            }
        });
        
        return res.status(201).json(telefone);
    } catch (error) {
        return res.status(400).json({ 
            error: 'Erro ao criar telefone',
            details: error.message 
        });
    }
}

const read = async (req, res) => {
    try {
        const where = {};
        
       
        if (req.query.alunoRa) {
            where.alunoRa = req.query.alunoRa;
        }

        const telefones = await prisma.telefone.findMany({
            where,
            include: {
                aluno: {
                    select: {
                        nome: true,
                        ra: true
                    }
                }
            },
            orderBy: {
                tipo: 'asc'
            }
        });
        
        return res.json(telefones);
    } catch (error) {
        return res.status(500).json({ 
            error: 'Erro ao buscar telefones',
            details: error.message 
        });
    }
}

const readOne = async (req, res) => {
    try {
        const telefone = await prisma.telefone.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                aluno: {
                    select: {
                        nome: true,
                        ra: true
                    }
                }
            }
        });

        if (!telefone) {
            return res.status(404).json({ error: 'Telefone não encontrado' });
        }

        return res.json(telefone);
    } catch (error) {
        return res.status(400).json({ 
            error: 'Erro ao buscar telefone',
            details: error.message 
        });
    }
}

const update = async (req, res) => {
    try {
        const data = {
            numero: req.body.numero,
            tipo: req.body.tipo
        };

        
        const telefoneExists = await prisma.telefone.findUnique({
            where: { id: parseInt(req.params.id) }
        });

        if (!telefoneExists) {
            return res.status(404).json({ error: 'Telefone não encontrado' });
        }

        const telefone = await prisma.telefone.update({
            where: {
                id: parseInt(req.params.id)
            },
            data
        });

        return res.json(telefone);
    } catch (error) {
        return res.status(400).json({ 
            error: 'Erro ao atualizar telefone',
            details: error.message 
        });
    }
}

const remove = async (req, res) => {
    try {
        
        const telefoneExists = await prisma.telefone.findUnique({
            where: { id: parseInt(req.params.id) }
        });

        if (!telefoneExists) {
            return res.status(404).json({ error: 'Telefone não encontrado' });
        }

        await prisma.telefone.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
        
        return res.status(204).send();
    } catch (error) {
        return res.status(400).json({ 
            error: 'Erro ao remover telefone',
            details: error.message 
        });
    }
}

module.exports = { 
    create, 
    read, 
    readOne, 
    update, 
    remove 
};
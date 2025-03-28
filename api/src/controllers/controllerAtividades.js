const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const atividade = await prisma.atividade.create({
            data: {
                nome: req.body.nome,
                alunoRA: req.body.alunoRA,
                datalmicio: new Date(req.body.datalmicio),
                dataEntrega: req.body.dataEntrega ? new Date(req.body.dataEntrega) : null,
                peso: req.body.peso,
                parcial: req.body.parcial || null,
                nota: req.body.nota || null
            }
        });
        return res.status(201).json(atividade);
    } catch (error) {
        return res.status(400).json({ 
            error: 'Erro ao criar atividade',
            details: error.message 
        });
    }
}

const read = async (req, res) => {
    try {
        const where = {};
        
        
        if (req.query.alunoRA) {
            where.alunoRA = req.query.alunoRA;
        }

        const atividades = await prisma.atividade.findMany({
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
                datalmicio: 'desc'
            }
        });
        return res.json(atividades);
    } catch (error) {
        return res.status(500).json({ 
            error: 'Erro ao buscar atividades',
            details: error.message 
        });
    }
}

const readOne = async (req, res) => {
    try {
        const atividade = await prisma.atividade.findUnique({
            where: {
                id: parseInt(req.params.id)
            },
            include: {
                aluno: {
                    select: {
                        nome: true,
                        ra: true,
                        email: true
                    }
                }
            }
        });

        if (!atividade) {
            return res.status(404).json({ error: 'Atividade não encontrada' });
        }

        return res.json(atividade);
    } catch (error) {
        return res.status(400).json({ 
            error: 'Erro ao buscar atividade',
            details: error.message 
        });
    }
}

const update = async (req, res) => {
    try {
        const data = {
            nome: req.body.nome,
            alunoRA: req.body.alunoRA,
            datalmicio: req.body.datalmicio ? new Date(req.body.datalmicio) : undefined,
            dataEntrega: req.body.dataEntrega ? new Date(req.body.dataEntrega) : null,
            peso: req.body.peso,
            parcial: req.body.parcial !== undefined ? req.body.parcial : undefined,
            nota: req.body.nota !== undefined ? req.body.nota : undefined
        };

        const atividade = await prisma.atividade.update({
            where: {
                id: parseInt(req.params.id)
            },
            data
        });

        return res.json(atividade);
    } catch (error) {
        return res.status(400).json({ 
            error: 'Erro ao atualizar atividade',
            details: error.message 
        });
    }
}

const remove = async (req, res) => {
    try {
        await prisma.atividade.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ 
            error: 'Erro ao remover atividade',
            details: error.message 
        });
    }
}


const calcularParcial = async (req, res) => {
    try {
        const atividade = await prisma.atividade.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });

        if (!atividade) {
            return res.status(404).json({ error: 'Atividade não encontrada' });
        }

       
        const parcial = atividade.nota !== null && atividade.peso !== null
            ? atividade.nota * atividade.peso
            : null;

        const atividadeAtualizada = await prisma.atividade.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                parcial
            }
        });

        return res.json({
            parcialCalculado: parcial,
            atividade: atividadeAtualizada
        });
    } catch (error) {
        return res.status(400).json({ 
            error: 'Erro ao calcular parcial',
            details: error.message 
        });
    }
}

module.exports = { 
    create, 
    read, 
    readOne, 
    update, 
    remove,
    calcularParcial
};
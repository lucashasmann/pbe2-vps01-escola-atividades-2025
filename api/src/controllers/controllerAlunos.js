const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const aluno = await prisma.aluno.create({
            data: {
                ra: req.body.ra,
                nome: req.body.nome,
                email: req.body.email,
                telefones: req.body.telefones ? {
                    create: req.body.telefones
                } : undefined
            },
            include: {
                telefones: true
            }
        });
        return res.status(201).json(aluno);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const read = async (req, res) => {
    try {
        const alunos = await prisma.aluno.findMany({
            include: {
                telefones: true,
                atividades: true
            }
        });
        return res.json(alunos);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const readOne = async (req, res) => {
    try {
        const aluno = await prisma.aluno.findUnique({
            where: {
                ra: req.params.ra
            },
            include: {
                telefones: true,
                atividades: true
            }
        });
        
        if (!aluno) {
            return res.status(404).json({ error: 'Aluno não encontrado' });
        }
        
        return res.json(aluno);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const update = async (req, res) => {
    try {
        const aluno = await prisma.aluno.update({
            where: {
                ra: req.params.ra
            },
            data: {
                nome: req.body.nome,
                email: req.body.email,
                telefones: req.body.telefones ? {
                    deleteMany: {},
                    create: req.body.telefones
                } : undefined
            },
            include: {
                telefones: true
            }
        });
        return res.status(200).json(aluno);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

const remove = async (req, res) => {
    try {
       
        await prisma.telefone.deleteMany({
            where: {
                alunoRa: req.params.ra
            }
        });

       
        await prisma.aluno.delete({
            where: {
                ra: req.params.ra
            }
        });
        
        return res.status(204).send();
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
}

module.exports = { create, read, readOne, update, remove };
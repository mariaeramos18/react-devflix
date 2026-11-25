import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const frontend = await prisma.category.upsert({
    where: { slug: "frontend" },
    update: {},
    create: { slug: "frontend", title: "Desenvolvimento Frontend" },
  });

  const backend = await prisma.category.upsert({
    where: { slug: "backend" },
    update: {},
    create: { slug: "backend", title: "Desenvolvimento Backend" },
  });

  const database = await prisma.category.upsert({
    where: { slug: "database" },
    update: {},
    create: { slug: "database", title: "Banco de Dados" },
  });

  await prisma.course.createMany({
    data: [
      { title: "Introdução ao React", description: "Conheça os fundamentos do React.", videoId: "Tn6-PIqc4UM", categoryId: frontend.id },
      { title: "JavaScript Moderno", description: "Aprenda conceitos de JavaScript.", videoId: "W6NZfCO5SIk", categoryId: frontend.id },
      { title: "Node.js para Iniciantes", description: "Introdução ao ambiente Node.js.", videoId: "TlB_eWDSMt4", categoryId: backend.id },
      { title: "APIs com Node.js", description: "Conheça o desenvolvimento de APIs.", videoId: "Oe421EPjeBE", categoryId: backend.id },
      { title: "Introdução ao SQL", description: "Aprenda os fundamentos da linguagem SQL.", videoId: "zsjvFFKOm3c", categoryId: database.id },
      { title: "PostgreSQL na prática", description: "Instalação, modelagem e consultas.", videoId: "SpfIwlAYaKk", categoryId: database.id },
      { title: "MongoDB para iniciantes", description: "Banco NoSQL orientado a documentos.", videoId: "ofme2o29ngU", categoryId: database.id },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
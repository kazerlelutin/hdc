import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.diet.createMany({
    data: [
      {
        name: "végétarien",
        description: "Ne consomme ni viande, ni poisson.",
      },
      {
        name: "pesco-végétarien",
        description:
          "Ne consomme pas de viande mais consomme du poisson et produit animal issu de la mer.",
      },
      {
        name: "végétalien",
        description: "Ne consomme aucun produit issu de l'exploitation animal.",
      },
      {
        name: "halal",
        description: "Ne consomme pas de produit non halal.",
      },
      {
        name: "kasher",
        description: "Ne consomme pas de produit non kasher.",
      },
      {
        name: "gluten free",
        description: "Ne consomme pas de produit contenant du gluten.",
      },
    ],
    skipDuplicates: true,
  });

  await prisma.category.createMany({
    data: [
      {
        name: "apéritif",
        description: "Parfait pour l'apéritif.",
      },
      {
        name: "entrée",
        description: "Pour commencer le repas.",
      },
      {
        name: "plat",
        description: "Le plat principal.",
      },
      {
        name: "dessert",
        description: "Pour finir le repas.",
      },
      {
        name: "sauce",
        description: "Pour accompagner un plat.",
      },
      {
        name: "préparation",
        description: "Partie d'une recette.",
      },
      {
        name: "petit déjeuner",
        description: "Pour bien commencer la journée.",
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

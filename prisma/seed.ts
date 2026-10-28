import { PrismaClient, Category, Season, Occasion } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const img = (id: string) => `https://images.unsplash.com/${id}?w=600&q=80`;

const items: {
  title: string;
  category: Category;
  color: string;
  colorHex: string;
  season: Season;
  occasions: Occasion[];
  imageUrl: string;
}[] = [
  { title: "Ivory silk blouse", category: "TOP", color: "ivory", colorHex: "#F5EFE6", season: "ALL", occasions: ["WORK", "DATE"], imageUrl: img("photo-1598554747436-c9293d6a588f") },
  { title: "Black ribbed tee", category: "TOP", color: "black", colorHex: "#1C1C1C", season: "ALL", occasions: ["CASUAL", "TRAVEL"], imageUrl: img("photo-1521572163474-6864f9cf17ab") },
  { title: "Camel wide-leg trousers", category: "BOTTOM", color: "camel", colorHex: "#C19A6B", season: "AUTUMN", occasions: ["WORK", "CASUAL"], imageUrl: img("photo-1594633312681-425c7b97ccd1") },
  { title: "Light-wash denim", category: "BOTTOM", color: "blue", colorHex: "#8FAACB", season: "ALL", occasions: ["CASUAL", "TRAVEL"], imageUrl: img("photo-1541099649105-f69ad21f3246") },
  { title: "Sage slip dress", category: "DRESS", color: "sage", colorHex: "#A3B18A", season: "SUMMER", occasions: ["DATE", "PARTY"], imageUrl: img("photo-1595777457583-95e059d581b8") },
  { title: "Oatmeal wool coat", category: "OUTERWEAR", color: "beige", colorHex: "#D8CBB5", season: "WINTER", occasions: ["WORK", "CASUAL"], imageUrl: img("photo-1539533018447-63fcce2678e3") },
  { title: "White leather sneakers", category: "SHOES", color: "white", colorHex: "#FFFFFF", season: "ALL", occasions: ["CASUAL", "TRAVEL"], imageUrl: img("photo-1549298916-b41d501d3772") },
  { title: "Black block heels", category: "SHOES", color: "black", colorHex: "#111111", season: "ALL", occasions: ["WORK", "PARTY", "DATE"], imageUrl: img("photo-1543163521-1bf539c55dd2") },
  { title: "Gold hoop earrings", category: "ACCESSORY", color: "gold", colorHex: "#D4AF37", season: "ALL", occasions: ["DATE", "PARTY", "WORK"], imageUrl: img("photo-1535632066927-ab7c9ab60908") },
  { title: "Tan leather tote", category: "BAG", color: "tan", colorHex: "#B08355", season: "ALL", occasions: ["WORK", "TRAVEL"], imageUrl: img("photo-1584917865442-de89df76afd3") },
];

const guestItems: typeof items = [
  { title: "Navy oxford shirt", category: "TOP", color: "navy", colorHex: "#1F2A44", season: "ALL", occasions: ["WORK", "CASUAL"], imageUrl: img("photo-1596755094514-f87e34085b2c") },
  { title: "Grey chinos", category: "BOTTOM", color: "grey", colorHex: "#8C8C8C", season: "ALL", occasions: ["WORK", "CASUAL"], imageUrl: img("photo-1473966968600-fa801b869a1a") },
  { title: "White leather sneakers", category: "SHOES", color: "white", colorHex: "#FFFFFF", season: "ALL", occasions: ["CASUAL"], imageUrl: img("photo-1549298916-b41d501d3772") },
];

async function main() {
  const email = "demo@veyra.app";
  await prisma.user.deleteMany({ where: { email } });
  const user = await prisma.user.create({ data: { email, name: "Demo Stylist", passwordHash: await bcrypt.hash("veyra123", 10) } });

  const admin = await prisma.profile.create({
    data: { ownerId: user.id, name: "Ava", isAdmin: true, avatarColor: "#B4645A", pinHash: await bcrypt.hash("1234", 10), stylePreferences: ["minimal", "elegant"] },
  });
  const guest = await prisma.profile.create({
    data: { ownerId: user.id, name: "Sam", avatarColor: "#6F86A6", pinHash: await bcrypt.hash("0000", 10), stylePreferences: ["classic"] },
  });

  const created = [];
  for (const item of items) created.push(await prisma.clothingItem.create({ data: { ...item, profileId: admin.id } }));
  for (const item of guestItems) await prisma.clothingItem.create({ data: { ...item, profileId: guest.id } });

  const outfit = await prisma.outfit.create({
    data: {
      profileId: admin.id,
      name: "Effortless Office",
      occasion: "WORK",
      score: 92,
      aiReason: "Ivory and camel create a soft tonal palette; black heels ground the look.",
      items: {
        create: [created[0], created[2], created[7], created[9]].map((it, position) => ({ itemId: it.id, position })),
      },
    },
  });
  await prisma.favoriteOutfit.create({ data: { profileId: admin.id, outfitId: outfit.id } });

  console.log(`Seeded ${email} (password: veyra123) with profiles Ava (PIN 1234, admin) and Sam (PIN 0000)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

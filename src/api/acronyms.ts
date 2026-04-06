import { Context } from "hono";
import { acronyms } from "../db/schema";
import { drizzle } from "drizzle-orm/d1";
import { eq } from "drizzle-orm";

export type AcronymSerialization = { version: 0; text: string };

export async function getAcronyms(
  c: Context<{ Bindings: Env }>,
): Promise<{ initial: string; all: string[] }> {
  const db = drizzle(c.env.DB);

  const allAcronyms = await db.select().from(acronyms);
  if (allAcronyms.length === 0) {
    await Promise.all([
      db.insert(acronyms).values({
        content: {
          version: 0,
          text: canonicalBandName,
        },
        isDefault: true,
      }),
      ...seededAcronyms.map((text) =>
        db.insert(acronyms).values({ content: { version: 0, text } }),
      ),
    ]);

    return {
      initial: canonicalBandName,
      all: [canonicalBandName, ...seededAcronyms],
    };
  }

  await Promise.all(
    allAcronyms
      .filter((a) => a.isDefault !== a.isDefaultNew)
      .map((a) =>
        db
          .update(acronyms)
          .set({ isDefaultNew: a.isDefault })
          .where(eq(acronyms.id, a.id)),
      ),
  );

  const initial = allAcronyms.find(({ isDefault }) => isDefault)!.content.text;
  const all = allAcronyms.map(({ content }) => content.text);
  return { initial, all };
}

const canonicalBandName = "Assigned Gay At Band";

export const seededAcronyms = [
  "A Gay Ass-Band",
  "A Gay-Ass Band",
  "A Gay Ass Bear 🐻",
  "A Gay Ass Bison",
  "A Gig A Buck",
  "A Good Amazing Boob",
  "A Goose Ass Butt",
  "A Great Ape Butt",
  "A Great Ass Band",
  "A Great Ass-Band",
  "Aaaaa Gghgghg AaaaAaaa Bpbbffft",
  "Aardvarks Gay A Boy",
  "Accidentally Gulped A Bee 🐝",
  "Actually, Goats Aren't Based",
  "Actually, Gonzo Ain't Binary",
  "Again??? Gain??? Ain??? Bain???",
  "AGenda Always Better",
  "Aggregate Ggregate Aggregate Baggregate",
  "Alchemizing Gender And Bops",
  "Aliens, Ghosts, And Bigfoot",
  "Alimony? Gee, Aurevoir Babe",
  "All Gargoyles Are Botanical",
  "All Gays Adore Blahaj",
  "All Gay Albuquerque Bimbos",
  "All Gas All Breaks",
  "All Gay All Baes",
  "All Gay All Brass",
  "All Gay All Bray",
  "All Geese Are Belligerent",
  "All Genders Adore Blahaj",
  "All Genders Are Bad",
  "All Genders Are Bastards",
  "All Genders Are Best",
  "All Girls Are Beautiful",
  "All Girls Are Boys",
  "All Glads Are Boods",
  "All Glad About Boobs",
  "All Glockenspiels Are Beautiful",
  "All Gongs Are Bangers",
  "All Goods Are Bads",
  "All Goys Are Birls",
  "All Grues Are Bleens",
  "All Guys Are Babes",
  "All Guys Aren't Boys",
  "All Queers Are Dyslexic",
  "Always Give Alien Boppers",
  "Almost Good At Baritone",
  "Always Getting Abit Better",
  "Always Grab A Buddy",
  "Always Growing As-a Band",
  "Always Growling At Bears",
  "Am Gad At Brammar",
  "Amazing Gregs Ate Benjamin",
  "Amethyst, Garnet, and 🅱️earl (and Steven!)",
  "Anxious, Gay, and Beautiful",
  "Anyone's Guess, AGAB Be",
  "Apathetic Guitarists Anger Bassists",
  "Artsy Gremlins Avoiding Boredom",
  "As Good As Bread",
  "Asiago, Gouda, And Brie",
  "Asparagus, Gazpacho Add Beans",
  "Asparagus Good As Beef",
  "Ass Good Ass Bread",
  "Ass Grass Ass Brass",
  "At Grammar Am Bad",
  "Ate Gluten, Achy Belly 🙁",
  "Autistic Gays Always Bounce",
  "Avid Gay Artistic Beets",
  "Avid Gay Autistic Beats",
];

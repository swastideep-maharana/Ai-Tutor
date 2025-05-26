import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  getUserCompanions,
  getUserSessions,
  getBookmarkedCompanions,
} from "@/lib/actions/companion.actions";
import Image from "next/image";
import CompanionsList from "@/components/CompanionsList";

const Profile = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const companions = await getUserCompanions(user.id);
  const sessionHistory = await getUserSessions(user.id);
  const bookmarkedCompanions = await getBookmarkedCompanions(user.id);

  return (
    <main className="min-lg:w-3/4 mx-auto p-6 bg-white text-orange-600 rounded-2xl shadow-lg">
      <section className="flex flex-col sm:flex-row justify-between items-center gap-8 border-b border-orange-300 pb-8 mb-8">
        <div className="flex items-center gap-6">
          <Image
            src={user.imageUrl}
            alt={user.firstName!}
            width={110}
            height={110}
            className="rounded-full border-4 border-orange-600"
          />
          <div>
            <h1 className="font-extrabold text-3xl text-orange-600">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-sm text-orange-400 mt-1">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="bg-orange-600 text-white rounded-xl p-6 shadow-md flex flex-col items-center min-w-[140px]">
            <div className="flex items-center gap-3 mb-2">
              <Image
                src="/icons/check.svg"
                alt="checkmark"
                width={24}
                height={24}
              />
              <span className="text-4xl font-extrabold">
                {sessionHistory.length}
              </span>
            </div>
            <p className="font-semibold">Lessons Completed</p>
          </div>

          <div className="bg-orange-600 text-white rounded-xl p-6 shadow-md flex flex-col items-center min-w-[140px]">
            <div className="flex items-center gap-3 mb-2">
              <Image src="/icons/cap.svg" alt="cap" width={24} height={24} />
              <span className="text-4xl font-extrabold">
                {companions.length}
              </span>
            </div>
            <p className="font-semibold">Companions Created</p>
          </div>
        </div>
      </section>

      <Accordion type="multiple" className="space-y-6">
        <AccordionItem
          value="bookmarks"
          className="border border-orange-300 rounded-xl bg-orange-100 p-4"
        >
          <AccordionTrigger className="text-2xl font-semibold text-orange-600 hover:text-orange-800 cursor-pointer">
            Bookmarked Companions ({bookmarkedCompanions.length})
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList
              companions={bookmarkedCompanions}
              title="Bookmarked Companions"
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="recent"
          className="border border-orange-300 rounded-xl bg-orange-100 p-4"
        >
          <AccordionTrigger className="text-2xl font-semibold text-orange-600 hover:text-orange-800 cursor-pointer">
            Recent Sessions
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList
              title="Recent Sessions"
              companions={sessionHistory}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem
          value="companions"
          className="border border-orange-300 rounded-xl bg-orange-100 p-4"
        >
          <AccordionTrigger className="text-2xl font-semibold text-orange-600 hover:text-orange-800 cursor-pointer">
            My Companions ({companions.length})
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList title="My Companions" companions={companions} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
};

export default Profile;

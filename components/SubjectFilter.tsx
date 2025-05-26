"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { subjects } from "@/constants";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SubjectFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("subject") || "all";

  const [subject, setSubject] = useState(query);

  useEffect(() => {
    let newUrl = "";
    if (subject === "all") {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["subject"],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "subject",
        value: subject,
      });
    }
    router.push(newUrl, { scroll: false });
  }, [subject, router, searchParams]);

  return (
    <div className="relative border border-black rounded-lg flex items-center gap-2 px-2 py-1 h-fit">
      <Select onValueChange={setSubject} value={subject}>
        <SelectTrigger className="w-full outline-none bg-transparent text-gray-800 cursor-pointer">
          <SelectValue placeholder="Subject" className="capitalize" />
        </SelectTrigger>
        <SelectContent className="bg-white rounded-lg shadow-lg">
          <SelectItem value="all" className="capitalize hover:bg-orange-100">
            All subjects
          </SelectItem>
          {subjects.map((subject) => (
            <SelectItem
              key={subject}
              value={subject}
              className="capitalize hover:bg-orange-100"
            >
              {subject}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SubjectFilter;

"use client";

import Link from "next/link";

import { sports } from "@/types/interfaces/sport";
import fieldServices from "@/services/field.services";
import CardFieldInManager from "@/components/manager/CardFieldInManager";
import { removeFieldById } from "../../utils/helpers";

import { useEffect, useState } from "react";
import { Field } from "@/types/interfaces/field";

// A Manager Page which help admin manage, observe data from web.
function ManagerHome() {
  const [fieldsInfo, setFieldsInfo] = useState<any>([]); //fieldsInfo store fields which is from Database

  const [sportId, setSportId] = useState<string>(sports.soccer.id);

  // Get Field from Database filter by SportId
  async function receiveFieldBySport(sportId: string) {
    try {
      const fields = await fieldServices.getAllBySport(sportId);
      setFieldsInfo(fields);
    } catch (error) {
      console.error("Error fetching fields: ", error);
    }
  }

  async function RemoveField(id: string) {
    await removeFieldById(id);
    await receiveFieldBySport(sportId);
  }

  //Set up value for fieldsInfo.
  useEffect(() => {
    receiveFieldBySport(sports.soccer.id);
  }, []);

  return (
    <>
      {/* Display button when clicked will trigger receiveFieldBySport */}
      <div className="inline-flex h-[120px] w-full items-center justify-center overflow-hidden rounded">
        {Object.entries(sports).map(([sportKey, sportInfo], index) => {
          return (
            <button
              onClick={() => {
                setSportId(sportId); // update selected sport Id
                receiveFieldBySport(sportInfo.id);
              }}
              key={index}
              className="inline-flex h-12 items-center justify-center gap-2 whitespace-nowrap bg-emerald-500 px-6 text-sm font-medium tracking-wide text-white transition duration-300 hover:bg-emerald-600 focus:bg-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-emerald-300 disabled:bg-emerald-300 disabled:shadow-none"
            >
              <span>{sportInfo.name}</span>
            </button>
          );
        })}
      </div>

      {/* Display field cards */}
      <div className="grid w-full justify-center">
        {fieldsInfo &&
          fieldsInfo.map((field: Field, index: number) => {
            return (
              <div key={index}>
                <CardFieldInManager
                  FieldInfo={field}
                  onRemoveField={() => RemoveField(field._id)}
                ></CardFieldInManager>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default ManagerHome;

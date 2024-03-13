"use client";

import { owner } from "@/types/interfaces/owner";

import field_OwnerService from "@/services/field_owner.service";
import { useEffect, useState } from "react";
import Link from "next/link";

function Admin_Owner() {
  const [owners, setOwners] = useState<owner[]>([]); // Store owners

  // Get All Owner
  async function GetAllOwner() {
    const res = await field_OwnerService.getAllOwners();
    setOwners(res);
  }

  async function AddAnOwner(owner: any) {
    await field_OwnerService.addAnOwner(owner);
  }

  async function removeAnOwner(id: string) {
    await field_OwnerService.deleteAnOwners(id);
    GetAllOwner();
  }

  useEffect(() => {
    GetAllOwner();
  }, []);
  return (
    <div>
      <h1>Nsnsa</h1>
      <button
        type="button"
        className="mb-2 me-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        Green
      </button>
      <div className="grid grid-rows-1 gap-5">
        {owners.map((owner: any, index: any) => {
          return (
            <div key={index} className="border-4 border-sky-500">
              <h1>{owner.username}</h1>
              <button
                type="button"
                className="mb-2 me-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={() => removeAnOwner(owner._id)}
              >
                Red
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Admin_Owner;

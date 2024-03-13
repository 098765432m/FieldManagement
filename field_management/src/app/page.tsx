// "use client";

// import Card from "@/components/Card";
// import SelectInput from "@/components/SelectInput";
// import FieldService from "@/services/field.services";
// import SportService from "@/services/sport.service";
// import { useEffect, useState } from "react";

// import { useSearchParams } from "next/navigation";

// interface FieldInfo {
//   _id: string;
//   fieldName: string;
//   fieldAddress: string;
//   rating: number;
//   sports: [
//     {
//       _id: string;
//       sportName: string;
//     },
//   ];
// }

// export default function Home() {
//   const sportId: { [key: number]: string } = {
//     1: "65af8051b08f6fbff6b02c72", //Bong da
//     2: "65af8059b08f6fbff6b02c74", //Bong chuyen
//     3: "65af8061b08f6fbff6b02c76", //Tennis
//     4: "65af807cb08f6fbff6b02c78", //Cau long
//     5: "65b0cd8632d1a59c9d7f5e33", //Bong ro
//   };

//   const [fieldsInfo, setFieldsInfo] = useState<FieldInfo[]>([]);
//   const [isLoad, setIsLoad] = useState(false);
//   const [sportIndex, setSportIndex] = useState<number>(1);
//   const [sportName, setSportName] = useState<string>("");

//   const searchParams = useSearchParams();
//   const param = searchParams.get("params1");

//   const retrieveFields = async () => {
//     try {
//       if (!isNaN(sportIndex)) {
//         const fields = await FieldService.getAllBySport(sportId[sportIndex!]);
//         const sport = await SportService.getAnSport(sportId[sportIndex!]);

//         setFieldsInfo(fields);
//         setSportName(sport.sportName);
//         setIsLoad(true);
//       }
//     } catch (error) {
//       console.error("Error fetching fields:", error);
//     }
//   };

//   useEffect(() => {
//     const temp = searchParams.get("sport");
//     console.log(temp);
//     console.log(typeof temp);

//     if (temp) {
//       setSportIndex(parseInt(temp));
//     }
//   }, [searchParams]);

//   useEffect(() => {
//     retrieveFields();
//   }, [sportIndex]);

//   //is load đợi API được lấy rồi mới hiện giao diện
//   if (!isLoad) {
//     return <div> Loading...</div>;
//   }

//   return (
//     <main>
//       <div className="border-stone-10 mb-10 w-max border border-solid px-20">
//         {" "}
//         <div className="flex flex-row items-center gap-6">
//           <SelectInput></SelectInput>
//         </div>
//       </div>
//       <p>{sportName}</p>
//       <div className="grid grid-cols-4 gap-6 p-10">
//         {fieldsInfo &&
//           fieldsInfo.map((field: any, index: any) => {
//             return (
//               <div className="basis-1/4" key={index}>
//                 <Card field={field}></Card>
//               </div>
//             );
//           })}
//       </div>
//     </main>
//   );
// }

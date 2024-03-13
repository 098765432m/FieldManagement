import Link from "next/link";

interface Sport {
  [key: string]: {
    index: number;
    name: string;
  };
}

function Sport_Link() {
  const sport: Sport = {
    Soccer: {
      index: 1,
      name: "Bóng đá",
    },
    Volleyball: {
      index: 2,
      name: "Bóng chuyền",
    },
    Tennis: {
      index: 3,
      name: "Quần vợt",
    },
    Badminton: {
      index: 4,
      name: "Cầu lông",
    },
    Basketball: {
      index: 5,
      name: "Bóng rổ",
    },
  };

  return (
    <div>
      {Object.entries(sport).map(([sportName, sportInfo], index) => (
        <Link
          key={index}
          href={{
            pathname: "/",
            query: { sport: sportInfo.index },
          }}
        >
          {" "}
          {sportInfo.name}{" "}
        </Link>
      ))}
    </div>
  );
}

export default Sport_Link;

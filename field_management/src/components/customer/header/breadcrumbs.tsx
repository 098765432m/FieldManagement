import React from "react";

export default function Breadcrumbs() {
  const breadcrumbs = [
    {
      path: "Home",
    },
    {
      path: "Projects",
    },
    {
      path: "UI components",
    },
    {
      path: "Project",
    },
  ];
  return (
    <>
      {/* <!-- Component: Flat basic breadcrumb --> */}
      <nav aria-label="Breadcrumb">
        <ol className="flex list-none items-stretch gap-2">
          {breadcrumbs.map((item, index) => {
            return (
              <li
                className={`${
                  index === breadcrumbs.length - 1
                    ? "flex flex-1 items-center gap-2"
                    : index === breadcrumbs.length - 2
                    ? "flex items-center gap-2"
                    : "hidden items-center gap-2 md:flex"
                }`}
                key={index}
              >
                <a
                  href="/"
                  className={`${
                    index === breadcrumbs.length - 1
                      ? "pointer-events-none max-w-[20ch] items-center gap-1 truncate whitespace-nowrap text-slate-400"
                      : "flex max-w-[20ch] items-center gap-1 truncate whitespace-nowrap text-slate-700 transition-colors hover:text-emerald-500"
                  }`}
                >
                  {item.path}
                </a>
                {index !== breadcrumbs.length - 1 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 flex-none stroke-slate-700 transition-transform md:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                    aria-labelledby={`aria-title-0${index} aria-description-0${index}`}
                    role="graphics-symbol"
                  >
                    <title id={`title-0${index}`}>Arrow</title>
                    <desc id={`description-0${index}`}>
                      Arrow icon that points to the next page in big screen
                      resolution sizes and previous page in small screen
                      resolution sizes.
                    </desc>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      {/* <!-- End Flat basic breadcrumb --> */}
    </>
  );
}

function Search() {
  return (
    <div className="relative my-6">
      <input
        id="id-l16"
        type="text"
        name="id-l16"
        placeholder="Search here"
        className="relative w-full h-12 px-4 pr-12 transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute w-6 h-6 cursor-pointer top-3 right-4 stroke-slate-400 peer-disabled:cursor-not-allowed"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
        aria-labelledby="title-9 description-9"
        role="graphics-symbol"
      >
        <title id="title-9">Search icon</title>
        <desc id="description-9">Icon description here</desc>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </div>
  );
}

export default Search;

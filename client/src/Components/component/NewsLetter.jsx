import React from "react";

function NewsLetter() {
  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className=" text-center">
      <p className=" text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className=" text-gray-400 mt-3">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum,
        dignissimos, possimus aperiam labore veniam deleniti quo quidem error
        atque laborum cupiditate quaerat id, reprehenderit ratione pariatur
        corporis tempore aut soluta.
      </p>
      <form
        className=" w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3"
        onSubmit={submitHandler}
      >
        <input
          className=" w-full sm:flex-1 outline-none"
          type="email"
          placeholder="Enter your email"
          required
        />
        <button
          className=" uppercase bg-black text-white text-xs px-10 py-4"
          type="submit"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
}

export default NewsLetter;

import React from "react";
import { assets } from "../assets/assets";
import Title from "../component/Tittle";
import Newsletter from "../component/NewsLetter";

function About() {
  return (
    <>
      <div className=" text-2xl text-center pt-8 border-t">
        <Title text1={"about"} text2={"us"} />
      </div>
      <div className=" my-10 flex flex-col md:flex-row gap-16">
        <img
          className=" w-full md: max-w-[450px]"
          src={assets.about_img}
          alt="about-img"
        />
        <div className=" flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            unde velit ex eaque quasi quis? Nesciunt dolorum consequatur
            assumenda molestiae odio placeat ipsam fugit ratione fugiat
            pariatur. Incidunt, ad voluptatibus.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
            accusantium explicabo praesentium distinctio officia, tenetur
            laboriosam natus corrupti deleniti nam at cum sunt quod ad minus a
            perferendis sint? Fuga.
          </p>
          <b className=" text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita
            ut itaque vero distinctio cumque. Maiores eos in veniam nam voluptas
            recusandae aut cumque amet similique quam! Eveniet aspernatur natus
            neque!
          </p>
        </div>
      </div>
      <div className=" text-4xl py-4">
        <Title text1={"why"} text2={"choose us"} />
      </div>
      <div className=" flex flex-col md:flex-row text-sm mb-20">
        <div className=" border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className=" text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
            ipsum, ut accusantium autem numquam tempora ducimus praesentium
            tenetur sunt doloribus quam, dignissimos ab, expedita odio alias
            possimus dolorum cum soluta.
          </p>
        </div>
        <div className=" border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className=" text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
            ipsum, ut accusantium autem numquam tempora ducimus praesentium
            tenetur sunt doloribus quam, dignissimos ab, expedita odio alias
            possimus dolorum cum soluta.
          </p>
        </div>
        <div className=" border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className=" text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
            ipsum, ut accusantium autem numquam tempora ducimus praesentium
            tenetur sunt doloribus quam, dignissimos ab, expedita odio alias
            possimus dolorum cum soluta.
          </p>
        </div>
      </div>
      <Newsletter />
    </>
  );
}

export default About;

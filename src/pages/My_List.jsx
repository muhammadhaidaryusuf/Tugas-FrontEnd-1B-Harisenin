import { useState } from "react";

import Navbar from "../components/Navbar";
import List_Image from "../components/List_Image";
import Footer from "../components/Footer";

const My_List = () => {
  const isProfilePage = location.pathname === "/profile";
  const [film] = useState([
    { id: 1, status: "Episode baru", ratingTop: "Top 10", url: "/img/my-movie/film 1.png" },
    { id: 2, url: "/img/my-movie/film 2.png" },
    { id: 3, status: "Episode baru", url: "/img/my-movie/film 3.png" },
    { id: 4, status: "Episode baru", url: "/img/my-movie/film 4.png" },
    { id: 5, status: "Episode baru", ratingTop: "Top 10", url: "/img/my-movie/film 5.png" },
    { id: 6, status: "Episode baru", ratingTop: "Top 10", url: "/img/my-movie/film 6.png" },
    { id: 7, ratingTop: "Top 10", url: "/img/my-movie/film 7.png" },
    { id: 8, ratingTop: "Top 10", url: "/img/my-movie/film 8.png" },
    { id: 9, url: "/img/my-movie/film 9.png" },
    { id: 10, url: "/img/my-movie/film 10.png" },
    { id: 11, url: "/img/my-movie/film 11.png" },
    { id: 12, url: "/img/my-movie/film 12.png" },
  ]);

  return (
    <>
      {!isProfilePage && <Navbar />}
      <div>
        <List_Image title="Daftar Film Saya" initialItems={film} />
      </div>
      <Footer />
    </>
  );
};

export default My_List;

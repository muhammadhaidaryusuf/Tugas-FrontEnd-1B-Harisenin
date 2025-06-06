import Navbar from '../components/Navbar';
import PackageChoice from '../components/PackageChoice';
import Footer from '../components/Footer';

const PackageSubscription = () => {
  const benefits = [
        {
            icon: "/img/img-component/download-icon.png",
            title: "Download Konten Pilihan",
        },
        {
            icon: "/img/img-component/ads-icon.png",
            title: "Tidak Ada Iklan",
        },
        {
            icon: "/img/img-component/movie-icon.png",
            title: "Tonton Semua Konten",
        },
        {
            icon: "/img/img-component/4k-icon.png",
            title: "Kualitas Maksimal Sampai Dengan 4K",
        },
        {
            icon: "/img/img-component/cell-phone-icon.png",
            title: "Tonton di TV, Tablet, Mobile, dan Laptop",
        },
        {
            icon: "/img/img-component/subtitles-icon.png",
            title: "Subtitle Untuk Konten Pilihan",
        },
    ];

  return (
      <>
          <Navbar />
          <section>
              <div className=" text-white text-center py-10">
                  <h2 className="text-2xl font-semibold mb-8 px-8 md:px-10">Kenapa Harus Berlangganan?</h2>
                  <div className=" mx-[2rem] justify-center items-center">
                      <div className="grid grid-cols-2 sm:grid-cols-2  md:grid-cols-3  md:gap-12 gap-20">
                          {benefits.map((benefit, index) => (
                              <div key={index} className="flex flex-col  items-center justify-center text-center">
                                  <img src={benefit.icon} alt={benefit.title} className="md:max-w-10 max-w-8  mb-4" />
                                  <p className="text-xs md:text-sm font-medium">{benefit.title}</p>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          </section>
          <section className="bg-[#22282A] w-[100%] py-10">
              <PackageChoice />
          </section>
          <section>
              <Footer/>
          </section>
      </>
  );
}

export default PackageSubscription;

import BooksList from "./BooksList";

const Home = () => {
 

  return (
    <div className="min-h-screen bg-indigo-50 px-6 py-10">
      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-600 text-center mb-8 tracking-wide">
        Explore Books by Category
      </h1>

     
      {/* Book List */}
      <BooksList />
    </div>
  );
};

export default Home;

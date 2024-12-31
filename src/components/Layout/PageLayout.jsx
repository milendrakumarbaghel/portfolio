export const PageLayout = ({ title, children }) => {
    return (
      <article>
        <h2 className="text-3xl text-white font-semibold mb-8 pb-2 border-b-2 border-[#ffd700] w-fit">
          {title}
        </h2>
        {children}
      </article>
    );
  };

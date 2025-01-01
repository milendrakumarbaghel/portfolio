const skills = [
    { name: 'C', icon: '/skills/c.svg' },
    { name: 'HTML', icon: '/skills/html.svg' },
    { name: 'CSS', icon: '/skills/css.svg' },
    { name: 'Java', icon: '/skills/java.svg' },
    { name: 'Python', icon: '/skills/python.svg' },
    { name: 'JavaScript', icon: '/skills/javascript.svg' },
    { name: 'ReactJS', icon: '/skills/react.svg' },
    { name: 'NodeJS', icon: '/skills/node.svg' },
    { name: 'ExpressJS', icon: '/skills/express.svg' },
    { name: 'MongoDB', icon: '/skills/mongo.svg' },
    { name: 'Git', icon: '/skills/git.svg' },
    { name: 'GitHub', icon: '/skills/github.svg' },
    { name: 'NPM', icon: '/skills/npm.svg' },
  ];

  export const Skills = () => {
    return (
      <article>
        <h2 className="text-3xl text-white font-semibold mb-8 pb-2 border-b-2 border-[#ffd700] w-fit">
          Skills
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="bg-gradient-to-br from-[#3a3e58] to-[#777f94] p-6 rounded-xl text-center"
            >
              <div className="h-12 flex items-center justify-center mb-4">
                <img src={skill.icon} alt={skill.name} className="h-full" />
              </div>
              <h3 className="text-white font-medium">{skill.name}</h3>
            </div>
          ))}
        </div>
      </article>
    );
  };

const skills = [
    { name: 'C', icon: '/assets/skills/c.svg' },
    { name: 'HTML', icon: '/assets/skills/html.svg' },
    { name: 'CSS', icon: '/assets/skills/css.svg' },
    { name: 'Java', icon: '/assets/skills/java.svg' },
    { name: 'Python', icon: '/assets/skills/python.svg' },
    { name: 'JavaScript', icon: '/assets/skills/javascript.svg' },
    { name: 'ReactJS', icon: '/assets/skills/react.svg' },
    { name: 'NodeJS', icon: '/assets/skills/node.svg' },
    { name: 'ExpressJS', icon: '/assets/skills/express.svg' },
    { name: 'MongoDB', icon: '/assets/skills/mongo.svg' },
    { name: 'Git', icon: '/assets/skills/git.svg' },
    { name: 'GitHub', icon: '/assets/skills/github.svg' },
    { name: 'NPM', icon: '/assets/skills/npm.svg' },
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

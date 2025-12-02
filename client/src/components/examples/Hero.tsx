import Hero from '../Hero';

export default function HeroExample() {
  return (
    <Hero 
      totalProjects={21} 
      totalStudents={45} 
      onScrollToProjects={() => console.log('Scroll to projects clicked')} 
    />
  );
}

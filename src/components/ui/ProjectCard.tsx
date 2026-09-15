
import Button from './Button';

type Project = {
  id: string;
  title: string;
  category: string;
  technologies: string[];
  description: string;
  liveUrl?: string;
  githubUrl?: string;
  images?: string[];
};

type ProjectCardProps = {
  project: Project;
  index: number;
  totalCards: number;
  progress: any;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  // Sticky scale stacking will be managed in the Projects component wrapper.
  // This is just the UI presentation of the card.
  
  return (
    <div className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 w-full max-w-6xl mx-auto shadow-2xl relative flex flex-col gap-8 overflow-hidden h-full">
      
      {/* Top Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
          <span className="font-black text-[clamp(3rem,10vw,80px)] text-[#0C0C0C] bg-[#D7E2EA] leading-none px-4 rounded-3xl shrink-0 text-center">
            {project.id}
          </span>
          <div>
            <span className="uppercase tracking-widest text-sm text-light-text opacity-70 block mb-1">
              {project.category}
            </span>
            <h3 className="font-medium uppercase text-[clamp(1.5rem,3vw,2.5rem)] leading-none text-white">
              {project.title}
            </h3>
          </div>
        </div>
        
        {project.liveUrl && (
          <div className="self-start lg:self-auto">
            <Button variant="liveProject" href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              Live Project
            </Button>
          </div>
        )}
      </div>

      {/* Description & Tech */}
      <div className="flex flex-col gap-4 max-w-3xl mt-4">
        <p className="font-light leading-relaxed opacity-80 text-[clamp(1rem,1.5vw,1.15rem)]">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {project.technologies.map(tech => (
            <span key={tech} className="px-3 py-1 rounded-full border border-[rgba(215,226,234,0.3)] text-xs uppercase tracking-wider text-light-text/70">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="bg-[#1A1A1A] w-full h-[clamp(130px,16vw,230px)] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] flex items-center justify-center overflow-hidden">
            {project.images && project.images[0] ? (
              <img src={project.images[0]} alt={`${project.title} screenshot 1`} className="w-full h-full object-cover" loading="lazy" />
            ) : (
              <span className="opacity-30 uppercase tracking-widest text-xs">Image 1</span>
            )}
          </div>
          <div className="bg-[#1A1A1A] w-full h-[clamp(160px,22vw,340px)] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] flex items-center justify-center overflow-hidden">
            {project.images && project.images[1] ? (
              <img src={project.images[1]} alt={`${project.title} screenshot 2`} className="w-full h-full object-cover" loading="lazy" />
            ) : (
              <span className="opacity-30 uppercase tracking-widest text-xs">Image 2</span>
            )}
          </div>
        </div>
        <div className="md:col-span-3 bg-[#1A1A1A] w-full min-h-[300px] h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] flex items-center justify-center overflow-hidden">
            {project.images && project.images[2] ? (
              <img src={project.images[2]} alt={`${project.title} screenshot 3`} className="w-full h-full object-cover" loading="lazy" />
            ) : (
              <span className="opacity-30 uppercase tracking-widest text-xs">Image 3</span>
            )}
        </div>
      </div>
    </div>
  );
}

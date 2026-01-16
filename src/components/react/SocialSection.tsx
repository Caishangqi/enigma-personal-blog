import type { SocialSectionProps } from '../../types';

export default function SocialSection({
  title,
  description,
  links,
  decorationImage
}: SocialSectionProps) {
  // Find Discord link from social links
  const discordLink = links.find(link => link.platform === 'discord');

  return (
    <section className="max-w-4xl mx-auto pt-20 pb-10 px-4">
      {/* Grid: mobile = single column (image on top), desktop = 2 columns */}
      <div className="grid lg:grid-cols-2 gap-8 items-center">
        {/* Image - first in DOM, so appears on top in mobile */}
        <div className="bg-center bg-no-repeat">
          <img
            src={decorationImage}
            alt="Social decoration"
            className="mx-auto lg:ml-0 h-[320px] w-auto"
            loading="lazy"
          />
        </div>

        {/* Content - second in DOM, so appears below image in mobile */}
        <div className="text-center lg:text-left">
          <h3 className="font-bold text-2xl text-white mb-2">{title}</h3>
          <p className="mb-4 text-lg">{description}</p>

          {discordLink && (
            <a
              href={discordLink.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mt-3 py-2 px-6 font-bold text-lg rounded-md transition-colors uppercase bg-discord text-white hover:bg-discord-light"
            >
              Join Our Discord
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

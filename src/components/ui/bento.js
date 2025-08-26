import React from 'react';

export const BentoGrid = ({ children, className, ...props }) => (
  <div className={`grid w-full auto-rows-[22rem] grid-cols-3 gap-4 ${className}`} {...props}>
    {children}
  </div>
);

export const BentoCard = ({ name, className, background, Icon, description, href, cta, ...props }) => (
  <div
    key={name}
    className={`group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl ${className}`}
    {...props}
  >
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
      <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">{name}</h3>
      <p className="max-w-lg text-neutral-400">{description}</p>
    </div>
    <div className="pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
      <a href={href} className="pointer-events-auto">
        {cta}
      </a>
    </div>
  </div>
); 
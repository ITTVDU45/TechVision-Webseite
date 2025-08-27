import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import ColourfulText from '@/components/ui/colourful-text';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function BlogSection({ 
  title = "KI-Insights & Trends", 
  subtitle = "Erfahren Sie mehr über aktuelle Entwicklungen und entdecken Sie Best Practices für Ihr Unternehmen.",
  blogPosts = []
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMobile = window.innerWidth < 768; // Annahme: Mobile Ansicht bei weniger als 768px
  const postsPerPage = isMobile ? 1 : 3; // Zeige 1 Post auf mobilen Geräten, sonst 3
  const pageCount = Math.ceil(blogPosts.length / postsPerPage);

  const visiblePosts = () => {
    const start = currentIndex;
    const end = start + postsPerPage;
    return blogPosts.slice(start, end);
  };

  const nextSlide = () => {
    if (currentIndex + postsPerPage < blogPosts.length) {
      setCurrentIndex(prev => prev + postsPerPage);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - postsPerPage);
    }
  };

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="relative inline-block bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 
                   text-transparent bg-clip-text animate-gradient-x">
              {title}
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            {subtitle}
          </p>
        </motion.div>

        {/* Blog Carousel */}
        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden mx-12">
            <div className={`flex gap-6 ${isMobile ? 'flex-col' : 'flex-row'}`}>
              {visiblePosts().map((post, index) => (
                <motion.div
                  key={post.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="w-full min-w-[calc(100%-1rem)] md:min-w-[calc(25%-1rem)]"
                >
                  <Link href={post.link}>
                    <div className={`bg-gradient-to-br ${
                      index % 2 === 0 
                        ? 'from-blue-500 via-indigo-500 to-violet-600' 
                        : 'from-violet-600 via-indigo-500 to-blue-500'
                    } p-[1px] rounded-2xl h-full`}>
                      <div className="bg-gray-900 p-4 rounded-2xl h-full flex flex-col">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-sm font-medium px-3 py-1 rounded-full bg-white/10">
                            {post.category}
                          </span>
                          <span className="text-sm text-gray-400">{post.date}</span>
                        </div>

                        <div className="aspect-video rounded-lg overflow-hidden mb-4">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>

                        <div className="mb-6 flex-grow">
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-400 line-clamp-2">
                            {post.excerpt}
                          </p>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 
                                    rounded-lg text-white text-sm font-medium 
                                    hover:shadow-lg transition-all duration-300
                                    relative overflow-hidden group"
                        >
                          <span className="relative z-10">Weiterlesen</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-violet-400 opacity-0 
                                        group-hover:opacity-20 transition-opacity duration-300" />
                        </motion.button>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full 
                      ${currentIndex === 0 
                        ? 'bg-blue-500/5 cursor-not-allowed' 
                        : 'bg-blue-500/10 hover:bg-blue-500/20 cursor-pointer'} 
                      transition-colors duration-200`}
          >
            <ChevronLeftIcon className={`w-6 h-6 ${
              currentIndex === 0 ? 'text-blue-400/50' : 'text-blue-400'
            }`} />
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex + postsPerPage >= blogPosts.length}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full 
                      ${currentIndex + postsPerPage >= blogPosts.length
                        ? 'bg-blue-500/5 cursor-not-allowed' 
                        : 'bg-blue-500/10 hover:bg-blue-500/20 cursor-pointer'} 
                      transition-colors duration-200`}
          >
            <ChevronRightIcon className={`w-6 h-6 ${
              currentIndex + postsPerPage >= blogPosts.length ? 'text-blue-400/50' : 'text-blue-400'
            }`} />
          </button>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: pageCount }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * postsPerPage)}
                className={`w-2 h-2 rounded-full transition-all duration-300 
                          ${Math.floor(currentIndex / postsPerPage) === index 
                            ? 'bg-blue-500 w-8' 
                            : 'bg-blue-500/20 hover:bg-blue-500/40'}`}
                aria-label={`Gehe zu Seite ${index + 1}`}
              />
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-16">
            <Link href="/blog">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 
                         rounded-xl text-lg font-medium relative overflow-hidden group
                         shadow-xl shadow-blue-500/20"
              >
                <span className="relative z-10">Zu unseren News</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 
                             transition-opacity duration-300" />
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 
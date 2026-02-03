'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Map, Stamp, Star, Users, ArrowRight, MapPin, BookOpen, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 pt-20 pb-16 md:pt-32 md:pb-24">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-200/20 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial="initial"
          animate="animate"
          variants={stagger}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Your cultural journey starts here
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold font-serif text-foreground mb-6 leading-tight"
          >
            The digital passport for{' '}
            <span className="text-primary-600">art lovers</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-foreground-muted max-w-2xl mx-auto mb-8"
          >
            Discover masterpieces nearby, stamp your visits, and connect with a global
            community of art enthusiasts. Every artwork tells a story — make it part of yours.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/signup">
              <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Start Your Journey
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="lg">
                Sign In
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16 md:py-24 bg-background-secondary">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-foreground-muted max-w-xl mx-auto">
              Four simple steps to start documenting your cultural adventures
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: MapPin,
                title: 'Discover',
                description: 'Find museums, galleries, and street art near you',
                color: 'primary',
              },
              {
                icon: Stamp,
                title: 'Stamp',
                description: 'Check in and log your visits instantly',
                color: 'accent',
              },
              {
                icon: Star,
                title: 'Reflect',
                description: 'Rate, take notes, and capture memories',
                color: 'primary',
              },
              {
                icon: Users,
                title: 'Connect',
                description: 'Share discoveries with fellow art lovers',
                color: 'accent',
              },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div
                  className={`w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center ${
                    step.color === 'primary'
                      ? 'bg-primary-100 text-primary-600'
                      : 'bg-accent-100 text-accent-600'
                  }`}
                >
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-foreground-muted">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 p-8 flex items-center justify-center">
                <Map className="w-32 h-32 text-primary-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-3xl font-bold font-serif text-foreground mb-4">
                Art at Your Fingertips
              </h3>
              <p className="text-foreground-muted mb-6">
                Explore an interactive map featuring museums, galleries, pop-up exhibitions,
                and hidden street art. Discover cultural gems you never knew existed,
                right in your neighborhood.
              </p>
              <ul className="space-y-3">
                {[
                  'Real-time location-based discovery',
                  'Filter by art type, rating, or distance',
                  'See what friends are exploring',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-foreground-secondary">
                    <div className="w-5 h-5 rounded-full bg-accent-100 flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-accent-600" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mt-16 md:mt-24">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:order-2"
            >
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-accent-100 to-accent-200 p-8 flex items-center justify-center">
                <BookOpen className="w-32 h-32 text-accent-400" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:order-1"
            >
              <h3 className="text-2xl md:text-3xl font-bold font-serif text-foreground mb-4">
                Your Personal Art Diary
              </h3>
              <p className="text-foreground-muted mb-6">
                Build a beautiful collection of stamps from every artwork and venue you visit.
                Add photos, ratings, and personal notes to remember each experience forever.
              </p>
              <ul className="space-y-3">
                {[
                  'Unique stamps for each venue',
                  'Add photos and personal notes',
                  'Track progress and achievements',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-foreground-secondary">
                    <div className="w-5 h-5 rounded-full bg-primary-100 flex items-center justify-center">
                      <ArrowRight className="w-3 h-3 text-primary-600" />
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 md:py-24 bg-gradient-to-br from-primary-500 to-primary-600">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-white mb-4">
            Ready to start collecting experiences?
          </h2>
          <p className="text-primary-100 mb-8 max-w-xl mx-auto">
            Join thousands of art lovers documenting their cultural journeys.
            Your passport awaits.
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary-600 hover:bg-primary-50"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              Create Your Passport
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 bg-foreground">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold font-serif text-white mb-1">
                Passpart
              </h3>
              <p className="text-sm text-foreground-muted">
                Your digital passport for art
              </p>
            </div>

            <nav className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-500">
              Made with love for art lovers everywhere
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

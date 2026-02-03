'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Map, Stamp, Star, Users, ArrowRight, MapPin, BookOpen, Sparkles } from 'lucide-react'
import { Button, LanguageSwitcher } from '@/components/ui'
import { useTranslations } from '@/lib/i18n'

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
  const t = useTranslations()

  const steps = [
    {
      icon: MapPin,
      title: t.landing.howItWorks.discover.title,
      description: t.landing.howItWorks.discover.description,
      color: 'primary',
    },
    {
      icon: Stamp,
      title: t.landing.howItWorks.stamp.title,
      description: t.landing.howItWorks.stamp.description,
      color: 'accent',
    },
    {
      icon: Star,
      title: t.landing.howItWorks.reflect.title,
      description: t.landing.howItWorks.reflect.description,
      color: 'primary',
    },
    {
      icon: Users,
      title: t.landing.howItWorks.connect.title,
      description: t.landing.howItWorks.connect.description,
      color: 'accent',
    },
  ]

  const mapFeatures = [
    t.landing.features.map.feature1,
    t.landing.features.map.feature2,
    t.landing.features.map.feature3,
  ]

  const passportFeatures = [
    t.landing.features.passport.feature1,
    t.landing.features.passport.feature2,
    t.landing.features.passport.feature3,
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Language Switcher - Fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher variant="toggle" />
      </div>

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
              {t.landing.hero.badge}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-bold font-serif text-foreground mb-6 leading-tight"
          >
            {t.landing.hero.title}{' '}
            <span className="text-primary-600">{t.landing.hero.titleHighlight}</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-foreground-muted max-w-2xl mx-auto mb-8"
          >
            {t.landing.hero.subtitle}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/signup">
              <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                {t.landing.hero.cta}
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="lg">
                {t.landing.hero.signIn}
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
              {t.landing.howItWorks.title}
            </h2>
            <p className="text-foreground-muted max-w-xl mx-auto">
              {t.landing.howItWorks.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
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
                {t.landing.features.map.title}
              </h3>
              <p className="text-foreground-muted mb-6">
                {t.landing.features.map.description}
              </p>
              <ul className="space-y-3">
                {mapFeatures.map((feature) => (
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
                {t.landing.features.passport.title}
              </h3>
              <p className="text-foreground-muted mb-6">
                {t.landing.features.passport.description}
              </p>
              <ul className="space-y-3">
                {passportFeatures.map((feature) => (
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
            {t.landing.cta.title}
          </h2>
          <p className="text-primary-100 mb-8 max-w-xl mx-auto">
            {t.landing.cta.subtitle}
          </p>
          <Link href="/signup">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary-600 hover:bg-primary-50"
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              {t.landing.cta.button}
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
                {t.landing.footer.tagline}
              </p>
            </div>

            <nav className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                {t.landing.footer.about}
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                {t.landing.footer.privacy}
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                {t.landing.footer.terms}
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                {t.landing.footer.contact}
              </Link>
            </nav>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-500">
              {t.landing.footer.madeWith}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

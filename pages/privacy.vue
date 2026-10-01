<script setup lang="ts">
import { site } from '~/data/site'

useSeoMeta({
  title: 'Privacy Policy',
  description: 'Tiny Explorers Hub privacy policy in plain language: we never collect data from children, likes are anonymous, and payments are handled by Paystack.',
})

const updated = '1 October 2026'
const mailto = `mailto:${site.email}?subject=${encodeURIComponent('Privacy request')}`

const summary = [
  { title: 'Nothing from children', text: 'Kids never sign up, log in or type anything here.', icon: 'shield', color: '#3DAA3C' },
  { title: 'No ad trackers', text: 'No advertising or tracking cookies, and no selling of data.', icon: 'close', color: '#E53935' },
  { title: 'Only what we need', text: 'A few details from grown-ups who contact us or give a gift.', icon: 'check', color: '#1E88E5' },
] as const

const sections = [
  { id: 'children', title: 'Children' },
  { id: 'contact', title: 'The contact form' },
  { id: 'likes', title: 'Likes and the te_vid cookie' },
  { id: 'payments', title: 'Gifts and payments' },
  { id: 'videos', title: 'YouTube videos' },
  { id: 'other', title: 'Other services we use' },
  { id: 'rights', title: 'Seeing or deleting your data' },
]
</script>

<template>
  <div>
    <section class="band pb-10 pt-12 md:pb-14 md:pt-16" aria-labelledby="privacy-title">
      <div class="container-x max-w-3xl text-center">
        <DisplayTitle text="PRIVACY" tag="p" class="!text-[40px] sm:!text-[56px]" />
        <h1 id="privacy-title" class="mt-4 text-3xl font-bold text-ink sm:text-4xl">Privacy, in plain language</h1>
        <p class="mt-4 leading-relaxed text-ink-soft">Tiny Explorers Hub is made for little children, so we keep data to an absolute minimum. Here's exactly what we collect and why.</p>
        <p class="mt-3 text-xs text-ink-mute">Last updated {{ updated }}</p>
      </div>
      <ul class="container-x mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
        <li v-for="s in summary" :key="s.title">
          <ChamferCard size="sm" class="h-full" body-class="h-full p-5">
            <span class="grid h-10 w-10 place-items-center rounded-full text-white" :style="{ backgroundColor: s.color }"><Icon :name="s.icon" class="h-5 w-5" /></span>
            <h2 class="mt-3 text-lg font-semibold text-ink">{{ s.title }}</h2>
            <p class="mt-1 text-sm text-ink-soft">{{ s.text }}</p>
          </ChamferCard>
        </li>
      </ul>
    </section>

    <section class="section bg-paper-light" aria-label="Privacy policy">
      <div class="container-x grid max-w-5xl gap-10 lg:grid-cols-[220px_1fr]">
        <nav aria-label="On this page" class="hidden lg:block">
          <div class="sticky top-28">
            <p class="font-display text-sm font-semibold uppercase tracking-widest text-ink-mute">On this page</p>
            <ol class="mt-3 space-y-1 text-sm">
              <li v-for="s in sections" :key="s.id"><a :href="`#${s.id}`" class="block rounded px-2 py-1.5 text-ink-soft hover:bg-white hover:text-brand-sky">{{ s.title }}</a></li>
            </ol>
          </div>
        </nav>

        <ChamferCard size="lg" body-class="px-5 py-8 sm:px-10 sm:py-10">
          <div class="space-y-10 leading-relaxed text-ink-soft [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-ink [&_p]:mt-3 [&_section]:scroll-mt-28 [&_strong]:text-ink [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
            <section id="children" aria-labelledby="p-children">
              <h2 id="p-children">Children</h2>
              <p>We do not collect any personal information from children. Children can watch every video without an account, and nothing on this site asks them to type a name, email, photo or anything else.</p>
              <p>If you think a child has sent us personal details, please <a :href="mailto" class="font-bold text-brand-sky hover:underline">email us</a> and we'll delete them.</p>
            </section>

            <section id="contact" aria-labelledby="p-contact">
              <h2 id="p-contact">The contact form</h2>
              <p>The contact form is for adults only (you confirm you're 18 or older). When you send it we keep:</p>
              <ul>
                <li>what your message is about, your name and email</li>
                <li>your school, brand or organization and sponsorship package, if you add them</li>
                <li>your message</li>
              </ul>
              <p>We use these only to reply to you. They're stored in our database and sent to our inbox by email. We never sell them or add you to a mailing list. Please don't include any child's personal details in a message.</p>
            </section>

            <section id="likes" aria-labelledby="p-likes">
              <h2 id="p-likes">Likes and the <code class="rounded bg-paper px-1.5 py-0.5 text-base text-ink">te_vid</code> cookie</h2>
              <p>When you press the heart on a video, your browser gets a cookie called <strong>te_vid</strong>. It holds a random ID, not your name or anything about you. We store it only as a scrambled (hashed) value, and we use it for one thing: counting likes, so each browser can like a video once and take the like back.</p>
              <p>The cookie lasts up to a year. You can delete it at any time in your browser settings; your past likes then simply stay anonymous. We don't use advertising, analytics or tracking cookies.</p>
            </section>

            <section id="payments" aria-labelledby="p-payments">
              <h2 id="p-payments">Gifts and payments</h2>
              <p>Gifts are processed by <strong>Paystack</strong>, a payment company. You enter your card or bank details on Paystack's own secure checkout, and we never see or store them. Paystack's own privacy policy applies to what you share with them.</p>
              <p>For each gift we store:</p>
              <ul>
                <li>your email (for the receipt)</li>
                <li>the amount</li>
                <li>the payment reference and status (for example, successful or pending)</li>
                <li>your name and a note, only if you choose to add them</li>
              </ul>
              <p>Gifts can only be made by adults.</p>
            </section>

            <section id="videos" aria-labelledby="p-videos">
              <h2 id="p-videos">YouTube videos</h2>
              <p>Most videos are played straight from our own site. Some come from YouTube. A YouTube video only loads when you press play, and it loads in YouTube's privacy-enhanced mode (youtube-nocookie.com), which doesn't store YouTube cookies on your device until the video plays. Once it plays, YouTube's privacy policy applies.</p>
              <p>Links to Facebook, YouTube and WhatsApp open those services, which have their own privacy policies.</p>
            </section>

            <section id="other" aria-labelledby="p-other">
              <h2 id="p-other">Other services we use</h2>
              <ul>
                <li><strong>Supabase</strong> hosts our database (videos, like counts, messages and gift records).</li>
                <li><strong>Resend</strong> delivers contact-form messages to our inbox.</li>
                <li><strong>Google Fonts</strong> serves the site's fonts, so your browser connects to Google to download them.</li>
              </ul>
              <p>To stop spam, our server briefly remembers the internet address that sends a form, only to limit how many messages it can send in a few minutes. It isn't saved with your message.</p>
            </section>

            <section id="rights" aria-labelledby="p-rights">
              <h2 id="p-rights">Seeing or deleting your data</h2>
              <p>You can ask us at any time what we hold about you, to correct it, or to delete it. Just email <a :href="mailto" class="[overflow-wrap:anywhere] font-bold text-brand-sky hover:underline">{{ site.email }}</a> from the address you used, and tell us what you'd like. We'll reply as soon as we can.</p>
              <p>We may keep gift records where the law requires it, for example for accounting.</p>
              <p>If this policy changes, we'll update it here and change the date at the top.</p>
            </section>
          </div>
        </ChamferCard>
      </div>
    </section>

    <JoinCta />
  </div>
</template>

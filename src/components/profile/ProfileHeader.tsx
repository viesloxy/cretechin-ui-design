// Page header for the profile page. Mirrors the my-assets/PageHeader pattern.

export default function ProfileHeader() {
  return (
    <section className="bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2 sm:pt-8 sm:pb-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-neutral-900 dark:text-white">
          Profil Pengguna
        </h1>
        <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-white/50 max-w-2xl">
          Kelola informasi akun dan preferensi Anda.
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useTranslation();

  const tiles = [
    { to: "/auto", icon: <AutoFilled />, label: t("pages.auto.title", "Auto") },
    { to: "/huur", icon: <HuurFilled />, label: t("pages.huur.title", "Huur") },
    { to: "/gezondheid", icon: <GezondheidFilled />, label: t("pages.gezondheid.title", "Gezondheid") },
    { to: "/contracten", icon: <ContractenFilled />, label: t("pages.contracten.title", "Contracten") },
    { to: "/overheid", icon: <OverheidFilled />, label: t("pages.overheid.title", "Overheid") },
    { to: "/diversen", icon: <PlusFilled />, label: t("pages.diversen.title", "Diversen") }
  ];

  return (
    <>
      {/* HeroClock zone (volledige blauwe band) */}
      <div className="hero-clock-zone">
        <HeroClock />
      </div>

      <section className="home-section fade-in">
        {/* Categorieën */}
        <h3 className="home-categories-heading microtype-caps">
          {t("pages.home.categories", "Categorieën")}
        </h3>
        <div className="home-grid">
          {tiles.map((tile) => (
            <Link key={tile.to} to={tile.to} className="home-tile hover-raise">
              <span className="tile-icon">{tile.icon}</span>
              <span className="tile-label">{tile.label}</span>
            </Link>
          ))}
        </div>

        {/* TaskList onder de categorieën */}
        <TaskList limit={6} />
      </section>
    </>
      );
}

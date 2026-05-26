function SectorApp() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [active, setActive] = React.useState("defence");

  // scroll expanded panel into view when changing sector — but NOT on first mount
  const expandRef = React.useRef(null);
  const didMount = React.useRef(false);
  React.useEffect(() => {
    if (!didMount.current) { didMount.current = true; return; }
    if (expandRef.current) {
      const r = expandRef.current.getBoundingClientRect();
      if (r.top < 0 || r.top > window.innerHeight) {
        window.scrollTo({ top: window.scrollY + r.top - 100, behavior: "smooth" });
      }
    }
  }, [active]);

  return (
    <>
      <Nav active="Sector Deep Dive"/>
      <SectorHero/>
      <SectorGridSection active={active} setActive={setActive}/>
      <div ref={expandRef}><ExpandedSection active={active}/></div>
      <HeatmapSection/>
      <RankingsSection/>
      <GaugesSection/>
      <Footer/>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Expanded sector">
          <TweakSelect label="Active sector"
            value={active}
            options={SECTORS.map(s => s.k)}
            onChange={v => setActive(v)}/>
        </TweakSection>
        <TweakSection label="Navigation">
          <TweakRadio label="Active page"
            value={tweaks.activeNav}
            options={["Home", "Price Impact", "Sector Deep Dive"]}
            onChange={v => setTweak("activeNav", v)}/>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

const sectorRoot = ReactDOM.createRoot(document.getElementById("root"));
sectorRoot.render(<SectorApp/>);
requestAnimationFrame(() => requestAnimationFrame(() => window.dispatchEvent(new Event("app:ready"))));

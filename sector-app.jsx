function SectorApp() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [active, setActive] = React.useState("defence");

  // Center the bar chart in the viewport whenever the sector changes (not on first mount)
  const expandRef = React.useRef(null);
  const didMount = React.useRef(false);
  React.useEffect(() => {
    if (!didMount.current) { didMount.current = true; return; }
    // Wait a tick so the new sector has rendered, then center the bar chart svg
    requestAnimationFrame(() => {
      if (!expandRef.current) return;
      const chart = expandRef.current.querySelector(".see-chart");
      const target = chart || expandRef.current;
      const r = target.getBoundingClientRect();
      const vh = window.innerHeight;
      let targetTop;
      if (r.height + 32 <= vh) {
        // chart fits — center it vertically
        targetTop = window.scrollY + r.top - (vh - r.height) / 2;
      } else {
        // taller than viewport — pin top with small offset so most is visible
        targetTop = window.scrollY + r.top - 24;
      }
      window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
    });
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

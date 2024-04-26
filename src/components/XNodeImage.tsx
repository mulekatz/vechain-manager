import xNode1 from "@/assets/xl1.png";
import xNode2 from "@/assets/xl2.png";
import xNode3 from "@/assets/xl3.png";
import xNode4 from "@/assets/xl4.png";

const xNodeLevel = [
  { image: xNode1, alt: "xNode1", version: "Mjolnir X" },
  { image: xNode2, alt: "xNode2", version: "Thunder X" },
  { image: xNode3, alt: "xNode3", version: "Strength X" },
  { image: xNode4, alt: "xNode4", version: "VeThor X" },
];

const XNodeImage = ({ level }: { level: string }) => (
  <div className="flex w-full gap-2 items-center justify-center">
    <img
      src={xNodeLevel[Number(level) - 1].image}
      alt={xNodeLevel[Number(level) - 1].alt}
      className="w-6"
    />
    <p>{xNodeLevel[Number(level) - 1].version}</p>
  </div>
);

export default XNodeImage;

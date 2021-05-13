```js
import React, { useEffect, useState, lazy, Suspense } from "react";
import PlanetAttribute from "./planet-attribute.component.js";
import NotablePeople from "./notable-people/notable-people.component.js";
import { getPlanet } from "../../utils/api.js";
// 引入组件的懒加载。import from方式在运行前就加载了。react提供lazy和suspense进行组件的懒加载
const Films = lazy(() =>
  // 调用systemJS：任何具有标准的URL都可被加载为一个模块
  System.import("@react-mf/people").then((mod) => mod.getFilmsComponent())
);

export default function SelectedPlanet(props) {
  const { selectedId } = props;
  const [selectedPlanet, setPlanet] = useState();

  useEffect(() => {
    if (selectedId) {
      const sub = getPlanet(selectedId).subscribe((planet) => {
        setPlanet(planet);
      });
      return () => {
        sub.unsubscribe();
      };
    }
  }, [selectedId]);

  if (!selectedPlanet) {
    return <div>No planet Selected</div>;
  }

  return (
    <div>
      <PlanetAttribute title={"Climate"} value={selectedPlanet.climate} />
      <PlanetAttribute
        title={"Diameter"}
        value={xxx}
      />
      <PlanetAttribute title={"Gravity"} value={selectedPlanet.gravity} />
      <PlanetAttribute title={"Terrain"} value={selectedPlanet.terrain} />
      <PlanetAttribute
        title={"Population"}
        value={xxx}
      />
      <NotablePeople people={selectedPlanet.residents} />
      <PlanetAttribute title={"Films"}>
        <Suspense fallback={null}>
          <Films films={selectedPlanet.films} />
        </Suspense>
      </PlanetAttribute>
    </div>
  );
}
```
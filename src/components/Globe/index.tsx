import { Cartesian3, Cartesian2, Color } from "cesium";
import * as React from "react";
import { Entity, Viewer, BillboardGraphics, LabelGraphics } from "resium";
import position from "../../assets/position.svg";
import { dateToString } from "../../utils/format-utils";

export interface GlobeProps {
  billboardList: NS_GEODATA.IPlace[];
}

export const Globe: React.FC<GlobeProps> = ({ billboardList }) => {
  return (
    // render the Resium Viewer component (3D globe without terrain)
    <Viewer
      timeline={false}
      baseLayerPicker={false}
      geocoder={false}
      homeButton={false}
      navigationHelpButton={false}
      scene3DOnly={true}
      animation={false}
      fullscreenButton={false}
    >
      {/* render the billboard list */}
      {billboardList.map(
        ({ givenName, lon, lat, importance, creationDate, givenId: givenID }, key) => {
          return (
            <Entity
              key={key}
              name={givenName}
              description={`Creation date: ${dateToString(
                new Date(creationDate)
              )}`}
              position={Cartesian3.fromDegrees(
                parseFloat(lon),
                parseFloat(lat),
                importance
              )}
            >
              <LabelGraphics
                backgroundColor={Color.BROWN}
                text={givenName + ", " + givenID}
                pixelOffset={new Cartesian2(0, 30)}
                font={"1.2em bold"}
              ></LabelGraphics>
              <BillboardGraphics height={50} width={50} image={position} />
            </Entity>
          );
        }
      )}
    </Viewer>
  );
};

import { FC } from "react";
import { IUniversity } from "./university.interface";

const CardUniversity: FC<{ data: IUniversity }> = ({ data }) => (
  <div>
    <h3>{data.name}</h3>
    <p>{data.country}</p>
  </div>
);

export default CardUniversity;

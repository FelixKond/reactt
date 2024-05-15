import { FC } from "react";

export interface IUniversity {
  country: string;
  name: string;
}

const CardUniversity: FC<{ data: IUniversity }> = ({ data }) => (
  <div>
    <h3>{data.name}</h3>
    <p>{data.country}</p>
  </div>
);

export default CardUniversity;

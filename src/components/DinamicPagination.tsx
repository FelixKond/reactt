import { FC, useEffect, useState } from "react";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import CardUniversity from "./Card";

export interface IUniversity {
  country: string;
  name: string;
}

const LIMIT_UNIVERSITIES = 15;

const DynamicPagination: FC = () => {
  const [universities, setUniversities] = useState<IUniversity[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      const offset = (currentPage - 1) * LIMIT_UNIVERSITIES;
      const response = await axios.get(
        `http://universities.hipolabs.com/search?offset=${offset}&limit=${LIMIT_UNIVERSITIES}`,
      );
      setUniversities((prev) => [...prev, ...response.data]);
    } catch (error) {
      console.log("Error fetching universities:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUniversities();
  }, [currentPage]);

  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  useEffect(() => {
    if (inView && !loading) {
      setCurrentPage((prev: number) => prev + 1);
    }
  }, [inView, loading]);

  return (
    <div>
      <h1>List Universities</h1>
      {universities.map((university) => (
        <CardUniversity data={university} key={university.name}></CardUniversity>
      ))}
      {loading && <div>Loading...</div>}
      <div ref={ref}>Loading more...</div>
    </div>
  );
};

export default DynamicPagination;

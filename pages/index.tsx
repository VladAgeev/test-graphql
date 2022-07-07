import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { FC } from "react";
import styles from "../styles/Home.module.css";

const GET_LOCATIONS = gql`
  query GetLocations {
    locations {
      id
      name
      overallRating
    }
  }
`;

const MUTATE_REVIEW = gql`
  mutation MutateReview($locationReview: LocationReviewInput!) {
    submitReview(locationReview: $locationReview) {
      success
    }
  }
`;

const Location: FC<{
  id: string;
  name: string;
  overallRating: number;
}> = ({ id, name, overallRating }) => {
  const [rateMutation, { data, reset }] = useMutation(MUTATE_REVIEW);
  const client = useApolloClient();

  const rateLocation = (rating: number) => () => {
    rateMutation({
      variables: {
        locationReview: {
          comment: "test comment",
          locationId: id,
          rating: rating,
        },
      },
    });
  };

  return (
    <div
      style={{
        backgroundColor: "blue",
        color: "white",
        padding: "3px",
        margin: "10px",
        boxSizing: "border-box",
      }}
    >
      <p>Name: {name}</p>
      <p>Rating: {overallRating.toFixed(1)}</p>

      <div>
        <span>Rate this location:</span>
        <button onClick={rateLocation(0)}>0</button>
        <button onClick={rateLocation(1)}>1</button>
        <button onClick={rateLocation(2)}>2</button>
        <button onClick={rateLocation(3)}>3</button>
        <button onClick={rateLocation(4)}>4</button>
        <button onClick={rateLocation(5)}>5</button>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const { data, loading } = useQuery(GET_LOCATIONS, {});
  const client = useApolloClient();

  const refetchLocations = () => {
    client.refetchQueries({
      include: "active",
      onQueryUpdated(observableQuery, { result }) {
        console.log(result);
        return true;
      },
    });
  };

  return (
    <div className={styles.container}>
      {loading && <p>Loading...</p>}

      {!loading &&
        data.locations.map((i: any) => <Location key={i.id} {...i} />)}

      <button onClick={refetchLocations}>Refetch</button>
    </div>
  );
};

export default Home;

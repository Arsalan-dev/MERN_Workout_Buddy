import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext} from '../hooks/useAuthContext'

//components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  //const [workouts, setWorkouts] = useState(null);
  const {workouts, dispatch} = useWorkoutsContext()
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      const respone = await fetch("/api/workouts", {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await respone.json(); //parse the json response into array of objects

      if (respone.ok) {
        //console.log(json)
        dispatch({type: 'SET_WORKOUTS', payload: json});
      }
    };

    if(user) {
      fetchWorkouts();
    }
    
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;

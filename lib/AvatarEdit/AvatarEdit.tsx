import classes from "./AvatarEdit.module.css";
import { ChangeEvent, useContext, useRef, useEffect, useReducer } from "react";
import { UserContext } from "../../utils/usercontext";
import LoaderPoints from "../LoaderPoints/LoaderPoints";
import Image from "next/image";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { useMutation } from "@apollo/client";
import updateAvatar from "../../graphql/mutations/updateAvatar.mutation";
import Ls from "../../utils/ls";
import { toast } from "react-toastify";

enum ActionKind {
  SET_CROP_DATA = "SET_CROP_DATA",
  SET_PICTURE = "SET_PICTURE",
  SET_LINK = "SET_LINK",
  SET_LOADING = "SET_LOADING",
  SET_NEW_IMAGE = "SET_NEW_IMAGE",
}

interface Action {
  type: ActionKind;
  payload: any;
}

interface State {
  loading: boolean;
  link: string;
  picture: any | undefined;
  thumb: string | undefined;
  original: string | undefined;
}

const initialState = {
  loading: false,
  link: "/tok-150.webp",
  picture: undefined,
  thumb: undefined,
  original: undefined,
};

function reducer(state: State, action: Action) {
  const newsState = { ...state };
  switch (action.type) {
    case ActionKind.SET_CROP_DATA:
      newsState.original = action.payload.original;
      newsState.thumb = action.payload.thumb;
      break;
    case ActionKind.SET_PICTURE:
      newsState.picture = action.payload;
      break;
    case ActionKind.SET_LINK:
      newsState.link = action.payload;
      break;
    case ActionKind.SET_LOADING:
      newsState.loading = action.payload;
      break;
    case ActionKind.SET_NEW_IMAGE:
      newsState.loading = false;
      newsState.link = action.payload;
      newsState.picture = undefined;
      break;
    default:
      throw new Error();
  }
  return newsState;
}

export default function AvatarEdit() {
  const cropperRef = useRef<HTMLImageElement>(null),
    [upAvatar, { data, error }] = useMutation(updateAvatar),
    [user, setUser] = useContext(UserContext),
    [state, dispatch] = useReducer(reducer, initialState);

  function onCrop() {
    const imageElement: any = cropperRef?.current,
      cropper: any = imageElement?.cropper;
    dispatch({
      type: ActionKind.SET_CROP_DATA,
      payload: {
        thumb: cropper.getCroppedCanvas({ width: 40, height: 40 }).toDataURL(),
        original: cropper
          .getCroppedCanvas({ width: 150, height: 150 })
          .toDataURL(),
      },
    });
  }

  async function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        dispatch({
          type: ActionKind.SET_PICTURE,
          payload: reader.result as any,
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  async function handleSubmit() {
    dispatch({ type: ActionKind.SET_LOADING, payload: true });
    const ls = new Ls();
    await upAvatar({
      variables: {
        didToken: ls.getUserToken(),
        thumb: state.thumb,
        original: state.original,
      },
    });
  }

  useEffect(() => {
    if (data && data.updateAvatar) {
      const newUser = { ...user };
      user.avatar = state.original.split(",")[1];
      setUser(newUser);
      dispatch({ type: ActionKind.SET_NEW_IMAGE, payload: state.original });
      toast.success("Avatar modifié !");
    }
  }, [data]);

  useEffect(() => {
    if (user.avatar) {
      dispatch({
        type: ActionKind.SET_LINK,
        payload: user.avatar.replace("size", "original"),
      });
    }
  }, [user.avatar]);

  return user ? (
    <div className={classes.container}>
      <label htmlFor="picture" className={classes.label}>
        <img src={state.link} alt="avatar" width="150" height="150" />
        <div className={classes.camera}>
          <Image
            className={classes.camera}
            src={"/camera.webp"}
            alt="camera"
            width="32"
            height="32"
            data-ignore="true"
            onError={(e: any) => (e.target.src = "/camera.webp")}
          />
        </div>
      </label>
      <input
        type="file"
        className={classes.input}
        name="picture"
        id="picture"
        onChange={handleChange}
      />
      {state.picture && (
        <div className={classes.containerCropper}>
          <div className={classes.cropper}>
            <Cropper
              responsive
              src={state.picture}
              style={{ maxHeight: 300 }}
              aspectRatio={1 / 1}
              guides={true}
              crop={onCrop}
              autoCropArea={1}
              ref={cropperRef}
            />
            <div className={classes.containerButton}>
              <button
                onClick={() =>
                  dispatch({ type: ActionKind.SET_PICTURE, payload: undefined })
                }
              >
                Annuler
              </button>
              <button onClick={handleSubmit} disabled={state.loading}>
                {state.loading ? (
                  <>
                    veuillez patienter
                    <LoaderPoints />
                  </>
                ) : (
                  "Valider"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <LoaderPoints />
  );
}

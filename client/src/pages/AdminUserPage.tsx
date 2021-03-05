import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loader } from "../components/Loader";
import { NoteList } from "../components/NoteList";
import { UserCard } from "../components/UserCard";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hook/http.hook";
import { useToast } from "../hook/toast.hook";
import { NoteProps, UserProps } from "../interface";

export const AdminUserPage: React.FC = () => {
  const { loading, request, error, clearError } = useHttp();
  const auth = useContext(AuthContext);
  const toast = useToast();
  const [userNotes, setUserNotes] = useState([]);
  const [user, setUser] = useState<UserProps>();

  const id = useParams<{ id: string }>().id;

  const getUserNotes = useCallback(async () => {
    try {
      const data = await request(`/api/admin/${id}`, "GET", null, {
        Authorization: `Bearer ${auth.token}`,
      });
      setUser(data);
      setUserNotes(data.owner);
    } catch (e) {}
  }, [request, auth.token, id]);

  useEffect(() => {
    getUserNotes();
  }, [getUserNotes]);
  const deleteNoteHandler = async (note: NoteProps) => {
    try {
      const data = await request(
        "/api/date/delete",
        "POST",
        { ...note },
        { Authorization: `Bearer ${auth.token}` }
      );
      getUserNotes();
      toast.success(data.message);
    } catch (e) {}
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError, toast]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container pb-2 pt-2">
      <div className="row">
        <div className=" col-lg-4">
          {" "}
          {!loading && user && <UserCard user={user} />}
        </div>
        <div className="col-lg-8">
          {" "}
          {!loading && (
            <NoteList
              noteList={userNotes}
              deleteNoteHandler={deleteNoteHandler}
            />
          )}
        </div>
      </div>
    </div>
  );
};

import React, { useCallback, useContext, useEffect, useState } from "react";
import { Loader } from "../components/Loader";
import { Paginate } from "../components/Paginate";
import { SearchUsers } from "../components/SearchUsers";
import { UserList } from "../components/UserList";
import { AuthContext } from "../context/AuthContext";
import { ToastContext } from "../context/ToastContext";
import { useHttp } from "../hook/http.hook";
import { AdminOptions } from "../components/AdminOptions";
import { UserProps } from "../interface";

export const AdminPage: React.FC = () => {
  const { request, error, clearError, loading } = useHttp();
  const [users, setUsers] = useState([]);
  const auth = useContext(AuthContext);
  const toast = useContext(ToastContext);
  const [currentPage, setCurentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const fetched = useCallback(async () => {
    try {
      const data = await request("api/admin/", "GET", null, {
        Authorization: `Bearer ${auth.token}`,
      });
      setUsers(data);
    } catch (e) {}
  }, [request, auth.token]);

  useEffect(() => {
    fetched();
  }, [fetched]);

  useEffect(() => {
    const indexLastPost = currentPage * postsPerPage;
    const indexFirstPost = indexLastPost - postsPerPage;
    const data = users.slice(indexFirstPost, indexLastPost);

    setCurrentPosts(data);
  }, [users, currentPage, postsPerPage]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    clearError();
  }, [error, clearError, toast]);

  const deleteHandler = async (checkUsers: string[]) => {
    try {
      const data = await request("/api/admin/delete", "POST", checkUsers, {
        Authorization: `Bearer ${auth.token}`,
      });
      setSelectedUsers([]);
      fetched();
      toast.success(data.message);
    } catch (e) {}
  };

  const blockHandler = async (checkUsers: string[]) => {
    try {
      const data = await request("/api/admin/block", "POST", checkUsers, {
        Authorization: `Bearer ${auth.token}`,
      });
      setSelectedUsers([]);
      fetched();
      toast.success(data.message);
    } catch (e) {}
  };
  const unlockHandler = async (checkUsers: string[]) => {
    try {
      const data = await request("/api/admin/unlock", "POST", checkUsers, {
        Authorization: `Bearer ${auth.token}`,
      });
      setSelectedUsers([]);
      fetched();
      toast.success(data.message);
    } catch (e) {}
  };
  const addAdminHandler = async (checkUsers: string[]) => {
    try {
      const data = await request("/api/admin/add_admin", "POST", checkUsers, {
        Authorization: `Bearer ${auth.token}`,
      });
      setSelectedUsers([]);
      fetched();
      toast.success(data.message);
    } catch (e) {}
  };
  const removeAdminHandler = async (checkUsers: string[]) => {
    try {
      const data = await request(
        "/api/admin/remove_admin",
        "POST",
        checkUsers,
        { Authorization: `Bearer ${auth.token}` }
      );
      setSelectedUsers([]);
      fetched();
      toast.success(data.message);
    } catch (e) {}
  };
  const paginate = (event: any, pageNumber: number) => {
    if (event.target.active) {
      event.target.active = true;
    } else {
      event.target.active = false;
    }
    setCurentPage(pageNumber);
  };

  const paginatePrev = () => {
    if (currentPage > 1) {
      setCurentPage(currentPage - 1);
    }
  };
  const paginateNext = (pageNumbers: number[]) => {
    if (currentPage !== pageNumbers.length) {
      setCurentPage(currentPage + 1);
    }
  };
  const pageSize = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPostsPerPage(Number(e.target.value));
    setCurentPage(1);
  };

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = users.filter((j: UserProps) =>
      j.email.includes(e.target.value)
    );
    setCurrentPosts(data);
  };
  const onToggleUser = (id: string) => {
    if (!selectedUsers.includes(id)) {
      setSelectedUsers((i: string[]) => i.concat(id));
    } else {
      setSelectedUsers((i: string[]) => i.filter((j: string) => j !== id));
    }
  };

  const getAllCheck = () => {
    if (selectedUsers.length === 0) {
      users.forEach((user: UserProps) => {
        setSelectedUsers((i: string[]) => i.concat(user._id));
      });
    } else {
      setSelectedUsers([]);
    }
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <div>
      {!loading && !!users.length && (
        <Paginate
          currentPage={currentPage}
          paginatePrev={paginatePrev}
          paginateNext={paginateNext}
          pageSize={pageSize}
          postsPerPage={postsPerPage}
          totalPosts={users.length}
          paginate={paginate}
        />
      )}

      <div className="d-flex justify-content-between align-items-center">
        {!loading && !!users.length && <SearchUsers search={search} />}
        {
          <AdminOptions
            users={selectedUsers}
            deleteHandler={deleteHandler}
            blockHandler={blockHandler}
            unlockHandler={unlockHandler}
            addAdminHandler={addAdminHandler}
            removeAdminHandler={removeAdminHandler}
          />
        }
      </div>
      {!loading && !!currentPosts.length && (
        <UserList
          users={currentPosts}
          onToggleUser={onToggleUser}
          getAllCheck={getAllCheck}
          selectedUsers={selectedUsers}
        />
      )}
    </div>
  );
};

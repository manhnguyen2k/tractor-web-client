import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon, CheckCircle as CheckCircleIcon, Clear as ClearIcon, Cancel as CancelIcon } from '@material-ui/icons';
import axios from '../../../_config/AxiosConfig';
import { User } from '_api/_types/User';
import './UserListPage.css';
import { useHistory } from 'react-router-dom';
import UserEditor from "../UsersEditor/UsersEditor"
const UserListPage: React.FC = () => {
  const history = useHistory();
  
  const [users, setUsers] = useState<User[]>([]);
  const [activeStatus, setActiveStatus] = useState<{ [key: string]: boolean }>({});
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  console.log(localStorage.getItem('accessToken'))
  useEffect(() => {
    axios.get('/users',{
      headers:{'Content-Type': 'application/json'}
    })
      .then(response => {

        console.log(response)
        const userList: User[] = response.data.data.map((item: any) => ({
          id: item._id,
          fullname: item.fullname,
         
          username: item.username,
          email: item.email,
        
          address: item.address,
          active: item.isConfirmed

        }));
        setUsers(userList);
        const initialActiveStatus: { [key:  string]: boolean } = {};
        userList.forEach(user => {
          initialActiveStatus[user.id] = user.active;
        });
        setActiveStatus(initialActiveStatus);;
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

  }, []);
      
  const handleDeleteUser = (userId: string) => {
    axios.delete(`/users/${userId}`)
      .then(response => {
        // Xóa thành công, cập nhật lại danh sách người dùng
        const updatedUsers = users.filter(user => user.id !== userId);
        setUsers(updatedUsers);
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };
  const handleToggleActive = (userId: string) => {
    const updatedActiveStatus = { ...activeStatus };
    updatedActiveStatus[userId] = !updatedActiveStatus[userId];
    setActiveStatus(updatedActiveStatus);
    
    const newStatus = updatedActiveStatus[userId] ? 'confirm' : 'unconfirm';
    console.log(newStatus)
    axios.patch(`/users/${newStatus}/${userId}`)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error('Lỗi khi cập nhật trạng thái hoạt động:', error);
        setActiveStatus({ ...activeStatus });
      });
  };
  
  const handleEditUser = (userId: string) => {
    history.push(`/administration/edit/${userId}`);
  };
  

  
  return (
    
    <div className="user-list-container">
      <div className="user-table-container">
        <Table className="user-table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Status</TableCell> {/* Add Status column */}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.fullname}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>
                {activeStatus[user.id] ? (
          <IconButton onClick={() => handleToggleActive(user.id)}>
            <CheckCircleIcon style={{ color: 'green' }} />
          </IconButton>
        ) : (
          <IconButton onClick={() => handleToggleActive(user.id)}>
            <CancelIcon style={{ color: 'red' }} />
          </IconButton>
        )}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditUser(user.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteUser(user.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          
        </Table>
      </div>
    </div>
  );
};
export default UserListPage
import { notification } from 'antd';

export const successNotification = (type, action) => {
    const successMessages = {
      login: 'Login successfully!',
      delete: 'User deleted successfully!',
      create: 'New user added successfully!',
      update: 'User details updated successfully!',
    };
  
    notification[type]({
      message: successMessages[action],
      placement: 'topRight',
      duration: 3,
    });
  };

export const errorNotification = (type, action) => {
  const errorMessages = {
    login: 'Login failed!',
    delete: 'Failed to delete the user!',
    update: 'Failed to update user details!',
  };

  notification[type]({
    message: errorMessages[action],
    placement: 'topRight',
    duration: 3,
  });
};
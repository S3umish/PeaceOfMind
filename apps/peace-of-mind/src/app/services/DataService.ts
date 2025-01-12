import { AlertData, FormData } from '../components/CreateTasks/CreateTasks';

export default class DataService {
  static getUser = (userId: number) => {
    return fetch(`/api/users/${userId}`);
  };
  static getAllTasks = (userId: number) => {
    return fetch(`/api/tasks?userId=${userId}`);
  };

  static getTask = (userId: number, taskId: number) => {
    return fetch(`/api/tasks/${taskId}?userId=${userId}`);
  };

  static createTask = (
    userId: number,
    formData: FormData,
    alerts: {
      alertDue: string;
      alertType: string;
      description: string;
      alertDestination: string;
      userId: number;
    }[]
  ) => {
    const body = {
      userId,
      description: formData.taskDescription,
      taskDateTime: formData.taskDueDate,
      complete: formData.complete,
      recurring: false,
      alerts,
    };
    return fetch(`/api/tasks?userId=${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };

  static getAlerts = (userId: number, taskId: number) => {
    return fetch(`/api/alerts?userId=${userId}&taskId=${taskId}`);
  };

  static createAlert = async (
    userId: number,
    taskId: number,
    alert: AlertData,
    alertDestination: string,
    description: string
  ) => {
    const body = {
      userId,
      taskId,
      alertDue: alert.alertDue,
      alertType: alert.alertType,
      alertDestination,
      description,
    };
    return fetch(`/api/alerts?userId=${userId}&taskId=${taskId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };
}

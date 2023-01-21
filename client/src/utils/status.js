const responseStatus = status => {
    if (status === 200) return { text: "Завершена", status: 'success'};
    else if (status === 404) return { text: "Отключена", status: 'danger'};
    else if (status === 500) return { text: "В обработке", status: 'warning'};
    else if (status === 499) return { text: "Выполните действия", status: "failed"};
    else if (status === 505) return { text: 'На рассмотрении', status: 'waiting'}
}
export default responseStatus;
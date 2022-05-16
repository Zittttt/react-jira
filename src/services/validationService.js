export default class validationService {
  checkBlank(data, selectorError) {
    if (data.value.trim() === "") {
      let mess = data.name + " is required !";
      selectorError.innerHTML = mess;
      return false;
    } else {
      selectorError.innerHTML = "";
      return true;
    }
  }

  checkStringLength(data, selectorError, min, max) {
    if (data.value.trim().length < min || data.value.trim().length > max) {
      let mess = `${data.name} must be ${min} - ${max} characters`;
      selectorError.innerHTML = mess;
      return false;
    } else {
      selectorError = "";
      return true;
    }
  }

  checkName(data, selectorError) {
    const nameRegex =
      "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
      "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
      "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";

    if (!data.value.match(nameRegex)) {
      let mess = "Please type your name";
      selectorError.innerHTML = mess;
      return false;
    } else {
      selectorError.innerHTML = "";
      return true;
    }
  }

  checkNumber(data, selectorError) {
    let numberRegex = /^[0-9]+$/;
    if (!data.value.match(numberRegex)) {
      let mess = "Please type the number";
      selectorError.innerHTML = mess;
      return false;
    } else {
      selectorError.innerHTML = "";
      return true;
    }
  }

  checkEmail(data, selectorError) {
    let emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!data.value.match(emailRegex)) {
      let mess = "Please type the email";
      selectorError.innerHTML = mess;
      return false;
    } else {
      selectorError.innerHTML = "";
      return true;
    }
  }
}

/*
 *
 * This file is generated under this project, "com.lguplus.stams".
 *
 * Date  : 2015. 8. 17. 오후 6:03:46
 *
 * Author: Park_Jun_Hong_(fafanmama_at_naver_com)
 * 
 */

package kr.ymtech.ojt.controller.model;

/**
 * 
 * @since 2015. 8. 17.
 * @author Park_Jun_Hong_(fafanmama_at_naver_com)
 */
public class ResponseData {

    public static final int SUCCESS_CODE = 0x00;

    public static final int ERROR_CODE = 0x01;
    /** 결과 코드 */
    private int code = SUCCESS_CODE;

    /** 결과 메세지 */
    private String msg;

    /** 결과 값 */
    private Object value;

    
    /** 에러 코드 */
    private String errorCode;
    
    /** 에러 메시지 */
    private String errorMsg;
    
    
    public ResponseData() {
        this(true);
    }

    public ResponseData(boolean success) {
        this.code = success ? SUCCESS_CODE : ERROR_CODE;
    }

    public int getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }

    public Object getValue() {
        return value;
    }

    public String getErrorCode() {
		return errorCode;
	}

    public String getErrorMsg() {
    	return errorMsg;
    }
    
    /**
     * 
     * @param success
     *            true is 0, false is 1
     * @return
     *
     * @since 2015. 8. 23.
     */
    public ResponseData setCode(boolean success) {
        this.code = success ? SUCCESS_CODE : ERROR_CODE;
        return this;
    }

    public ResponseData setCode(int resultCode) {
        this.code = resultCode;
        return this;
    }

    public ResponseData setMsg(String resultMsg) {
        this.msg = resultMsg;
        return this;
    }

    public ResponseData setValue(Object resultValue) {
        this.value = resultValue;
        return this;
    }


	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}


	public void setErrorMsg(String errorMsg) {
		this.errorMsg = errorMsg;
	}

	/**
     * @see java.lang.Object#toString()
     */
    @Override
    public String toString() {
        return "ResponseData [code=" + code + ", msg=" + msg + ", value=" + value + "]";
    }
}

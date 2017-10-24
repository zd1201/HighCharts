package kr.ymtech.ojt.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.ymtech.ojt.controller.model.ResponseData;

@RestController
public class ChartController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	@RequestMapping(value ="/getAreaData", produces="application/json", method = RequestMethod.GET) 
	@ResponseBody
	public ResponseEntity<Object> getAreaData(
	HttpServletRequest request, HttpServletResponse response) {
		
		if(logger.isInfoEnabled()){
			logger.info("start getData");
		}
		
		ResponseData responseData = new ResponseData();
		
		// 1 ~ 10까지 랜덤 숫자 구하기
        int random1 = (int) (Math.random() * (50000000 - 5000000)) + 5000000;
        // 10 ~ 20까지 랜덤 숫자 구하기
        int random2 = (int) (Math.random() * (50000000 - 5000000)) + 5000000;
        // 20 ~ 30까지 랜덤 숫자 구하기
        int random3 = (int) (Math.random() * (50000000 - 5000000)) + 5000000;
        // 20 ~ 30까지 랜덤 숫자 구하기
        int random4 = (int) (Math.random() * (50000000 - 5000000)) + 5000000;

        Integer result[] = {random1, random2, random3, random4};
		
		
        responseData.setCode(ResponseData.SUCCESS_CODE);
	    responseData.setValue(result);
	    
		return new ResponseEntity<Object>(responseData, HttpStatus.OK);
			
	}
	
	@RequestMapping(value ="/getMultiData", produces="application/json", method = RequestMethod.GET) 
	@ResponseBody
	public ResponseEntity<Object> getMultiData(
	HttpServletRequest request, HttpServletResponse response) {
		
		if(logger.isInfoEnabled()){
			logger.info("start getData");
		}
		
		ResponseData responseData = new ResponseData();
		
		// 0 ~ 250까지 랜덤 숫자 구하기
        float random1 = getRandom(0, 250);
        // 1000 ~ 1030까지 랜덤 숫자 구하기
        float random2 = getRandom(1000, 1030);
        // 0 ~ 30까지 랜덤 숫자 구하기
        float random3 = getRandom(0, 30);

        float result[] = {random1, random2, random3};
		
		
        responseData.setCode(ResponseData.SUCCESS_CODE);
	    responseData.setValue(result);
	    
		return new ResponseEntity<Object>(responseData, HttpStatus.OK);
			
	}
	
	@RequestMapping(value ="/getLineData", produces="application/json", method = RequestMethod.GET) 
	@ResponseBody
	public ResponseEntity<Object> getLineData(
	HttpServletRequest request, HttpServletResponse response) {
		
		if(logger.isInfoEnabled()){
			logger.info("start getLineData");
		}
		
		ResponseData responseData = new ResponseData();
		
		 // 0.0 ~ 1.0까지 랜덤 숫자 구하기
        float random = (float) Math.random();
        
//        double random = Math.random() * 30 + 10;
		
        responseData.setCode(ResponseData.SUCCESS_CODE);
	    responseData.setValue(random);
	    
		return new ResponseEntity<Object>(responseData, HttpStatus.OK);
			
	}
	
	@RequestMapping(value ="/getBarData", produces="application/json", method = RequestMethod.GET) 
	@ResponseBody
	public ResponseEntity<Object> getStackData(
	HttpServletRequest request, HttpServletResponse response) {
		
		if(logger.isInfoEnabled()){
			logger.info("start getLineData");
		}
		
		ResponseData responseData = new ResponseData();
		
		 // 1 ~ 100까지 랜덤 숫자 구하기
        int random1 = (int) (Math.random() * 100) + 1;
        int random2 = (int) (Math.random() * 100) + 1;
        int random3 = (int) (Math.random() * 100) + 1;
        
        Integer result[] = {random1, random2, random3};
        		
//       double random = Math.random() * 30 + 10;
		
        responseData.setCode(ResponseData.SUCCESS_CODE);
	    responseData.setValue(result);
	    
		return new ResponseEntity<Object>(responseData, HttpStatus.OK);
			
	}
	
	public float getRandom(int min, int max){
		
		// min ~ max 범위 랜덤 숫자 구하기
		float random = (float) Math.random() * (max - min) + min;
        
		return random;
	}

}

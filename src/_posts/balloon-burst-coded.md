---
title: Balloon Burst Problem Coded
description: "Finally ended up coding the explanation of the DP algorithm for the Balloon Burst Problem from leetcode. Simply involved a dp array with some nested for loops."
date: July 31 2024
image: "https://i.imgur.com/MTpUUxU.png"
---
Now that I've completely understood how the optimal substructure for this problem looks like, I can focus on coding an algorithm that recursively leverages this optimal substructure and finds the maximal solution to the problem. As reference, here's the problem once again: 

> You are given `n` balloons, indexed from `0` to `n - 1`. Each balloon is painted with a number on it represented by an array `nums`. You are asked to burst all the balloons.
> 
> If you burst the `ith` balloon, you will get `nums[i - 1] * nums[i] * nums[i + 1]` coins. If `i - 1` or `i + 1` goes out of bounds of the array, then treat it as if there is a balloon with a `1` painted on it.
> 
> Return the *maximum* coins you can collect by bursting the balloons wisely.

The idea is that we're trying to memoize recursive computations as we progress through smaller subproblems to finally the solve the largest subproblem: our original problem of `n` balloons, which we represent as an array of `n` elements. 

I'm thinking we store the memoized values in a matrix called `dp[i][j]`, where `i` and `j` are integers that go from `0` to `n-1`. I've structured it this way to store the optimal solution for subarray `i` to `j`.  

To make all this clearer, I'm going to use the example array `[3, 1, 5, 8]`. So, `dp[2][4]` is the optimal solution for the subarray `[5, 8]` since they're the second and fourth elements of the original array. I'm not 0-indexing this because I'm going to append `1` to both ends of our array to deal with the out of bound cases of multiplying by `1` (as required by the problem). So, our new augmented input array is `[1, 3, 1, 5, 8, 1]`. The `0th` index has `1` and the `nth` index does too. 

Obviously, `dp[i][i]` are trivially going to be a product of elements `i, i - 1, & i + 1`: 

* `dp[1][1] = 1 * 3 * 1 = 3`

* `dp[2][2] = 3 * 1 * 5 = 15`

* `dp[3][3] = 1 * 5 * 8 = 40`

* `dp[4][4] = 5 * 8 * 1 = 40`

For two-element subarrays (`dp[2][3]` for example), we either pop `2` last or `3` last. If we pop element `3` last for example, we then don't re-compute  `dp[2][2]` to find the sum since we figured that out earlier. Whichever yields the maximum value for the subarray will be value we store in `dp[2][3]`. 

Similarly, for three-element subarrays, we have three choices for popping the last element, and similarly the maximum of the three will be our 

Now, the idea is to iterate through this `dp` matrix and fill it up and return the result of `dp[1][n-2]` since that gives the solution for the entire input array (excluding the `1`s we added for computational reasons). 

The algorithm is just a bunch of carefully ranged for-loops: 

```python
def maxCoins(self, nums):
	nums = [1] + nums + [1]
	n = len(nums)
	dp = [[0] * n for _ in range(n) ]
	
	for length in range(1, n - 1):
		for left in range(1, n - length):
			right = left + length - 1
			
			# Now, we find the optimal point to pop the element from nums array.
			# k iterates over the every element in the subarray that possibly 
			# yields the max when popped last.
			for k in range(left, right + 1):
				curr = dp[left][right]
				
				prod = nums[left - 1] * nums[k] * nums[right + 1]
				l_subp = dp[left][k - 1]
				r_subp = dp[k + 1][right]
				
				dp[left][right] = max(curr, l_subp + prod + r_subp)
				
	return dp[1][n - 2]
```

The loops are pretty straightforward. To breakdown why the for loops are nested in that order, here's some reasoning—our target iterators are `left` and `right`. The `right` iterator is dependent the `left` iterator via the relationship `right = left + length - 1`.

I ran into some small range issues but they were mostly because I had the ranges in the for loop statements wrong in a subtle manner.  Adding some trivial print statements to the code helped me debug it pretty easily. Nothing fancy about it. 

That's about it! 
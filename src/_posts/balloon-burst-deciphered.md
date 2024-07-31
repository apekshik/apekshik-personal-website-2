---
title: Balloon Burst Problem Deciphered (LeetCode Hard)
description: "The Balloon Burst problem involves maximizing coin collection by popping balloons strategically. The challenge lies in the evolving nature of the array with each pop. By framing the problem in terms of the last pop in an optimal sequence, one can derive a dynamic programming solution based on optimal substructures."
date: July 30 2024
image: "https://i.imgur.com/BYOuGr4.jpg"
---

After thoroughly understanding what DP problems are and how they're tackled, I want to get my toes wet by actually trying to solve a problem from Leetcode. I asked ChatGPT-4o to give me a problem and I got this problem (it's a Leetcode Hard) : Balloon Burst. The problem statement is goes like this

> You are given `n` balloons, indexed from `0` to `n - 1`. Each balloon is painted with a number on it represented by an array `nums`. You are asked to burst all the balloons.
> 
> If you burst the `ith` balloon, you will get `nums[i - 1] * nums[i] * nums[i + 1]` coins. If `i - 1` or `i + 1` goes out of bounds of the array, then treat it as if there is a balloon with a `1` painted on it.
> 
> Return the *maximum* coins you can collect by bursting the balloons wisely.

This does sound like a classic DP problem since you're required to optimize some value that likely exhibits an optimal substructure. 

Solving this problem involves two large steps: 

1. Find optimal substructure
2. Code the recursive algorithm that takes advantage of the optimal substructure. 

However, there were a couple subtleties I noticed which took me a while to wrap my head around. 

For context, I understood DP through the classic Rod-Cutting Problem. Where you're given a list of prices for various integer valued rod lengths. Your goal was to cut a given rod of length `n` into pieces that would maximize the total selling price of the cut pieces of rods. 

There, the optimal substructure was obvious—you cut the rod into pieces, say sizes `k` and `n-k`. Then, you assume each of the two pieces are themselves optimal solutions. In the case of these balloons, it isn't as straightforward. In fact, there's a cool temporal inversion at play when you do find the optimal substructure that I'll talk about once I explain the solution. 

For the case of the balloons, you pop one (element) and you're left with (at most) two adjacent subarrays which stick together to form a new array that's missing the popped value. Then, you pop another element from this new array. This was the first hurdle I encountered. The array you're optimizing for each time keeps changing based on each pop! The rods that remained after cutting didn't morph into new rods. The smaller rods were unaltered. 

This is hard. Hmmm... So, what I thought instead is to look at the problem from a high level. You, see, each time you pop an element from the array, you multiply its adjacent elements with it and add it to the cumulative sum you're maintaining. So, in a way, you're looking to find a **series of optimal** pops necessary to get the maximum sum. 

This gives away a new way to look at the optimal substructure—since you're accumulating the products, the second to last pop in our hypothetical optimal series has something interesting to tell you. It must be optimal because you add it to the last pop. If it wasn't, you'd be violating the assumption that your series is optimal. So, instead of thinking about the first pop, let's frame our optimal substructure in terms of the *last* pop in the series. 

The optimal substructure naturally arises from this approach now. The second to last pop was optimal for the last pop to be optimal. For the second to last pop to be optimal, the third to last pop must've been optimal, and so on... 

Next post, I'll actually end up coding a solution to the problem. 
